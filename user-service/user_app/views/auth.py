from rest_framework_simplejwt.views import (
    TokenObtainPairView as BaseTokenObtainPairView,
    TokenRefreshView as BaseTokenRefreshView
)
from drf_spectacular.utils import extend_schema, OpenApiExample

class TokenObtainPairView(BaseTokenObtainPairView):
    @extend_schema(
        examples=[OpenApiExample('Example', value={
            "username": "admin",
            "password": "pass123"
        })]
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class TokenRefreshView(BaseTokenRefreshView):
    pass