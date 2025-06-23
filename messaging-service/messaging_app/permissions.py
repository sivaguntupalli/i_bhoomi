from rest_framework.permissions import BasePermission

class IsOperator(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm('messaging_app.mediate_chat')

class IsAdminOrOperator(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.has_perm('messaging_app.manage_room') or 
            request.user.has_perm('messaging_app.mediate_chat')
        )