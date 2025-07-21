# user_app/admin.py
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.urls import path
from django.shortcuts import render, redirect
from django.db.models.signals import post_save
from django.dispatch import receiver
from django import forms

from .models import Profile
from .constants import ROLES

# 🛡️ Ensure Profiles auto-create on admin user creation
@receiver(post_save, sender=User)
def ensure_profile_exists(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'profile'):
        Profile.objects.create(user=instance)

# 🧠 Enforce password hashing on admin creation
class SecureUserCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'is_staff', 'is_active')

    def save(self, commit=True):
        user = super().save(commit=False)
        if self.cleaned_data['password']:
            user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user

# 📦 Inline Profile for embedding into User admin
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'

    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if db_field.name == 'role':
            kwargs['choices'] = [
                (role['name'], role['display'])
                for role in ROLES.values()
            ]
        return super().formfield_for_choice_field(db_field, request, **kwargs)

# ⚙️ Custom User Admin with secure creation and profile handling
class CustomUserAdmin(BaseUserAdmin):
    form = SecureUserCreationForm
    inlines = [ProfileInline]
    list_display = ('username', 'email', 'get_role', 'is_staff')
    list_filter = ('profile__role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')

    def get_role(self, obj):
        return obj.profile.get_role_display() if hasattr(obj, 'profile') else "-"
    get_role.short_description = 'Role'

    def get_urls(self):
        urls = super().get_urls()
        return [
            path(
                'role-assignment/<str:user_ids>/',
                self.admin_site.admin_view(role_assignment_view),
                name='role-assignment'
            )
        ] + urls

# 🛠️ Custom admin view for bulk role assignment
def role_assignment_view(request, user_ids):
    users = User.objects.filter(id__in=user_ids.split(','))

    if request.method == 'POST':
        role = request.POST.get('role')
        for user in users:
            if not hasattr(user, 'profile'):
                Profile.objects.create(user=user)
            user.profile.role = role
            user.profile.save()
        request._messages.add(
            admin.ModelAdmin.message_user,
            f"Updated roles for {users.count()} users."
        )
        return redirect('admin:auth_user_changelist')

    return render(request, 'admin/role_assignment.html', {
        'users': users,
        'roles': ROLES.values(),
        'title': 'Bulk Role Assignment'
    })

# 🚀 Register updated admin views
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'phone', 'address')
    list_filter = ('role',)
    search_fields = ('user__username', 'phone', 'address')