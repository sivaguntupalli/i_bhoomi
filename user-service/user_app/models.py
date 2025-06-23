from django.contrib.auth.models import User
from django.db import models
from .constants import get_role_choices  # Changed import

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='profile'
    )
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    role = models.CharField(
        max_length=20,
        choices=get_role_choices(),  # Now using centralized roles
        default='buyer'
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user'],
                name='unique_user_profile'
            )
        ]

    def __str__(self):
        return f"{self.user.username} - {self.role}"