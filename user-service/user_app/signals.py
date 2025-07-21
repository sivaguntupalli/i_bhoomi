# filepath: user-service/user_app/signals.py

from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    # 🔐 Always ensure a profile exists, even if user already created earlier
    Profile.objects.get_or_create(user=instance)

    # ✅ Optional: if profile exists, you can trigger save logic for updates
    if not created:
        instance.profile.save()
