from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
    TokenRefreshView as BaseTokenRefreshView
)
from drf_spectacular.utils import extend_schema, OpenApiExample
from user_app.serializers import RegisterSerializer, UserSerializer

@extend_schema(tags=['Authentication'])
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @extend_schema(
        examples=[
            OpenApiExample(
                'Registration Example',
                value={
                    "username": "newuser",
                    "password": "complexpassword123",
                    "email": "user@example.com"
                }
            )
        ]
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user).data,
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)

@extend_schema(tags=['Authentication'])
class TokenObtainPairView(BaseTokenObtainPairView):
    @extend_schema(
        examples=[
            OpenApiExample(
                'Valid Example',
                value={"username": "admin", "password": "pass123"},
                description='Standard login'
            )
        ],
        responses={
            200: OpenApiExample(
                'Success Response',
                value={
                    "refresh": "token.here",
                    "access": "token.here",
                    "user": {"username": "admin", "email": "admin@example.com"}
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

@extend_schema(tags=['Authentication'])
class TokenRefreshView(BaseTokenRefreshView):
    @extend_schema(
        examples=[
            OpenApiExample(
                'Refresh Example',
                value={"refresh": "your.refresh.token.here"}
            )
        ]
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)