from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile
from django.core.exceptions import ObjectDoesNotExist

class ProfileSerializer(serializers.ModelSerializer):
    """
    Handles serialization of Profile model data
    - role is read-only to prevent direct modification
    """
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'role']
        read_only_fields = ['role']  # Role can only be changed via proper role management views

class UserSerializer(serializers.ModelSerializer):
    """
    Serializes User model with additional role info from Profile
    - Includes read-only fields for security
    """
    role = serializers.CharField(source='profile.role', read_only=True)  # Pulls from Profile model
    last_login = serializers.DateTimeField(read_only=True)  # Never allow modification via API

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'last_login', 'role']  # Note: password NEVER included

class RegisterSerializer(serializers.ModelSerializer):
    """
    Special serializer for user registration
    - Handles password securely (write-only)
    - Creates both User and Profile records
    """
    password = serializers.CharField(write_only=True)  # Critical security measure

    class Meta:
        model = User
        fields = ['username', 'email', 'password']  # Only these fields are required for registration

    def create(self, validated_data):
        """
        Custom creation logic:
        1. Creates User with hashed password
        2. Automatically creates linked Profile (if not exists)
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']  # Automatically hashed by create_user()
        )

        # Avoid IntegrityError if profile already exists
        Profile.objects.get_or_create(user=user)

        return user
