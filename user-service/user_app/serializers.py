# user-service/user_app/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer to include user info in JWT response
    """
    def validate(self, attrs):
        data = super().validate(attrs)

        try:
            profile = self.user.profile
            role = profile.role
        except ObjectDoesNotExist:
            role = None  # fallback, but shouldn't happen

        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': role
        }

        return data


class ProfileSerializer(serializers.ModelSerializer):
    """
    Handles serialization of Profile model data
    - role is read-only to prevent direct modification
    """
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'role']
        read_only_fields = ['role']


class UserSerializer(serializers.ModelSerializer):
    """
    Serializes User model with additional role info from Profile
    - Includes read-only fields for security
    """
    role = serializers.CharField(source='profile.role', read_only=True)
    last_login = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'last_login', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    """
    Special serializer for user registration
    - Handles password securely (write-only)
    - Creates both User and Profile records
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Profile.objects.get_or_create(user=user)
        return user
