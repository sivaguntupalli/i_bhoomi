from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import path
from django.shortcuts import render, redirect
from .models import Profile
from .constants import ROLES

def role_assignment_view(request, user_ids):
    users = User.objects.filter(id__in=user_ids.split(','))
    
    if request.method == 'POST':
        role = request.POST.get('role')
        for user in users:
            user.profile.role = role
            user.profile.save()
        admin.ModelAdmin.message_user(
            request, 
            f"Updated roles for {users.count()} users"
        )
        return redirect('admin:auth_user_changelist')
    
    return render(request, 'admin/role_assignment.html', {
        'users': users,
        'roles': ROLES.values(),
        'title': 'Bulk Role Assignment'
    })

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

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'get_role', 'is_staff')
    inlines = [ProfileInline]
    list_filter = ('profile__role', 'is_staff', 'is_superuser')
    
    def get_role(self, obj):
        return obj.profile.get_role_display()
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

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)