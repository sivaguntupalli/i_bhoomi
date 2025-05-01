@echo off
taskkill /IM "python.exe" /F
taskkill /IM "node.exe" /F
echo All services stopped
pause