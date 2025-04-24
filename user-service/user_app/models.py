# filepath: user-service/user_app/models.py

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    # Add more fields as needed

    def __str__(self):
        return f"{self.user.username}'s profile"