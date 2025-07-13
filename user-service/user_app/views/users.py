from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from ..models import Profile
from ..serializers import UserSerializer, RegisterSerializer, ProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.select_related('profile')
    serializer_class = UserSerializer
    # ... (keep your existing viewset code)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer