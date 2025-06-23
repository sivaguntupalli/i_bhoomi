from .auth import TokenObtainPairView, TokenRefreshView
from .users import UserViewSet, RegisterView, ProfileUpdateView
from .roles import UpdateUserRoleView, UserBulkActionsAPIView  # ✅ correct source

__all__ = [
    'TokenObtainPairView',
    'TokenRefreshView',
    'UserViewSet',
    'RegisterView',
    'ProfileUpdateView',
    'UpdateUserRoleView',           # ✅ now correctly imported
    'UserBulkActionsAPIView'
]
