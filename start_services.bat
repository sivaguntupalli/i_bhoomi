@echo off
setlocal enabledelayedexpansion

:: =============================================
:: iBhoomi Microservices Launcher (Enhanced)
:: =============================================

:: Configuration
set PROJECT_ROOT=%~dp0
set LOGS_DIR=%PROJECT_ROOT%logs
set USER_SERVICE_PORT=8000
set PROPERTY_SERVICE_PORT=8001
set FRONTEND_PORT=3000

:: Create logs directory
if not exist "%LOGS_DIR%" mkdir "%LOGS_DIR%"

:: Kill existing processes (optional)
taskkill /f /im python.exe /t >nul 2>&1
taskkill /f /im node.exe /t >nul 2>&1

:: Start Services
title Launching iBhoomi Services...

:: 1. User Service
start "User Service" /MIN cmd /c "cd /d "%PROJECT_ROOT%user-service" && python manage.py runserver %USER_SERVICE_PORT% > "%LOGS_DIR%\user_service.log" 2>&1"

:: 2. Property Service
start "Property Service" /MIN cmd /c "cd /d "%PROJECT_ROOT%property-service" && python manage.py runserver %PROPERTY_SERVICE_PORT% > "%LOGS_DIR%\property_service.log" 2>&1"

:: 3. Frontend (with dependency check)
if exist "%PROJECT_ROOT%frontend\package.json" (
    start "Frontend" /MIN cmd /c "cd /d "%PROJECT_ROOT%frontend" && (if not exist node_modules npm install) && npm start > "%LOGS_DIR%\frontend.log" 2>&1"
) else (
    echo [ERROR] Frontend directory not found
)

:: Verify Services
timeout /t 10 /nobreak >nul

echo Testing services...
curl -s http://localhost:%USER_SERVICE_PORT%/api/users/ || echo [ERROR] User Service failed
curl -s http://localhost:%PROPERTY_SERVICE_PORT%/api/properties/ || echo [ERROR] Property Service failed

:: Open Interfaces
start "" "http://localhost:%USER_SERVICE_PORT%/api/docs/"
start "" "http://localhost:%PROPERTY_SERVICE_PORT%/api/docs/"
start "" "http://localhost:%FRONTEND_PORT%/"

:: Status
echo.
echo ======================================
echo SERVICES RUNNING:
echo User API:    http://localhost:%USER_SERVICE_PORT%/
echo Property API: http://localhost:%PROPERTY_SERVICE_PORT%/
echo Frontend:    http://localhost:%FRONTEND_PORT%/
echo.
echo Logs: %LOGS_DIR%
echo ======================================
pause