# 📄 File: user-service/user_app/views/auth.py

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
    TokenRefreshView as BaseTokenRefreshView
)
from drf_spectacular.utils import extend_schema, OpenApiExample
from django.contrib.auth import get_user_model
from ..serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer

User = get_user_model()

@extend_schema(
    tags=["Authentication"],
    summary="User Registration",
    description="Creates a new user account with default 'individual' role",
    examples=[
        OpenApiExample(
            "Registration Request Example",
            value={
                "username": "newuser",
                "email": "user@example.com",
                "password": "ComplexPass123"
            },
            request_only=True
        ),
        OpenApiExample(
            "Registration Response Example",
            value={
                "user": {
                    "id": 1,
                    "username": "newuser",
                    "email": "user@example.com",
                    "role": "individual"
                },
                "message": "User registered successfully"
            },
            response_only=True
        )
    ]
)
class RegisterView(generics.CreateAPIView):
    """
    Public user registration endpoint.
    Creates both User and Profile records in a single request.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(user).data,
                "message": "User registered successfully"
            },
            status=status.HTTP_201_CREATED
        )

@extend_schema(
    tags=["Authentication"],
    summary="JWT Token Pair",
    description="Obtain access and refresh tokens for authentication",
    examples=[
        OpenApiExample(
            "Login Request Example",
            value={"username": "admin", "password": "admin123"},
            request_only=True
        ),
        OpenApiExample(
            "Login Response Example",
            value={
                "refresh": "xxxxx.yyyyy.zzzzz",
                "access": "aaaaa.bbbbb.ccccc",
                "user": {
                    "username": "admin",
                    "email": "admin@example.com",
                    "role": "admin"
                }
            },
            response_only=True
        )
    ]
)
class TokenObtainPairView(BaseTokenObtainPairView):
    """
    Custom JWT token endpoint that includes user details in the response.
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            try:
                user = User.objects.select_related('profile').get(
                    username=request.data.get("username")
                )
                response.data["user"] = {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.profile.role
                }
            except User.DoesNotExist:
                pass  # Edge case; shouldn't occur if credentials are valid
        return response

@extend_schema(
    tags=["Authentication"],
    summary="JWT Token Refresh",
    description="Refresh an expired access token using a valid refresh token",
    examples=[
        OpenApiExample(
            "Refresh Request Example",
            value={"refresh": "xxxxx.yyyyy.zzzzz"},
            request_only=True
        ),
        OpenApiExample(
            "Refresh Response Example",
            value={"access": "aaaaa.bbbbb.ccccc"},
            response_only=True
        )
    ]
)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class TokenRefreshView(BaseTokenRefreshView):
    """
    Standard JWT token refresh endpoint.
    """
    pass
