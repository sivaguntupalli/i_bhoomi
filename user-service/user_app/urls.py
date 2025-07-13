from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.auth import RegisterView, TokenObtainPairView, TokenRefreshView
from .views.users import UserViewSet, ProfileUpdateView
from .views.roles import UpdateUserRoleView, UserBulkActionsAPIView

router = DefaultRouter()
router.register(r'list', UserViewSet, basename='user')  # List/view users at /api/users/list/

urlpatterns = [
    # ✅ Auth endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ✅ Profile / Role routes
    path('profile/', ProfileUpdateView.as_view(), name='profile'),
    path('users/<int:pk>/roles/', UpdateUserRoleView.as_view(), name='update_user_role'),
    path('users/bulk_actions/', UserBulkActionsAPIView.as_view(), name='user_bulk_actions'),

    # ✅ Router at the end to avoid overriding above
    path('', include(router.urls)),
]
