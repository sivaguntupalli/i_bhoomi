from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ReadOnlyModelViewSet
from ..models import Profile
from ..serializers import UserSerializer, RegisterSerializer, ProfileSerializer

class UserViewSet(ReadOnlyModelViewSet):  # Single definition
    """
    Read-only endpoint for user listing (Admin only)
    """
    queryset = User.objects.select_related('profile')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class RegisterView(generics.CreateAPIView):
    """
    Public user registration endpoint
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileUpdateView(generics.RetrieveUpdateAPIView):
    """
    Authenticated user profile management
    """
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        # Ensure users can only update their own profile
        return self.request.user.profile