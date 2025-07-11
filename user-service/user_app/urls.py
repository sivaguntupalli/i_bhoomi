from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    UserViewSet,
    RegisterView,
    ProfileUpdateView,
    TokenObtainPairView,
    TokenRefreshView,
    UpdateUserRoleView,
    UserBulkActionsAPIView
)

# DRF Router for ViewSet
router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),  # /api/users/

    # Auth
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileUpdateView.as_view(), name='profile'),

    # Token (optional duplication here, usually only needed if these are customized)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Role management
    path('users/<int:pk>/roles/', UpdateUserRoleView.as_view(), name='update_user_role'),
    path('users/bulk_actions/', UserBulkActionsAPIView.as_view(), name='user_bulk_actions'),
]
