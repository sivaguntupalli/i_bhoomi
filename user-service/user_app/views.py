from rest_framework import viewsets, generics, permissions
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
    TokenRefreshView as BaseTokenRefreshView  # Add this import
)
from drf_spectacular.utils import extend_schema, OpenApiTypes, OpenApiExample
from .models import Profile
from .serializers import UserSerializer, RegisterSerializer, ProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class TokenObtainPairView(BaseTokenObtainPairView):
    @extend_schema(
        operation_id='token_obtain',
        summary='Obtain JWT Token',
        description='Returns access and refresh tokens for authentication',
        request=OpenApiTypes.OBJECT,
        examples=[
            OpenApiExample(
                'Example Request',
                value={"username": "user1", "password": "pass123"},
                request_only=True
            )
        ],
        responses={
            200: OpenApiTypes.OBJECT,
            400: OpenApiTypes.OBJECT
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class TokenRefreshView(BaseTokenRefreshView):
    @extend_schema(
        operation_id='token_refresh',
        summary='Refresh JWT Token',
        description='Returns new access token using refresh token',
        request=OpenApiTypes.OBJECT,
        examples=[
            OpenApiExample(
                'Example Request',
                value={"refresh": "your_refresh_token_here"},
                request_only=True
            )
        ],
        responses={
            200: OpenApiTypes.OBJECT,
            401: OpenApiTypes.OBJECT
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)