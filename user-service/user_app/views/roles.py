from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib.auth.models import User
from ..models import Profile


class UpdateUserRoleView(APIView):
    """
    Update role of a single user
    Endpoint: PATCH /users/<int:pk>/roles/
    """
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        new_role = request.data.get('role')

        if not new_role:
            return Response(
                {'error': 'Missing role in request'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            profile = Profile.objects.get(user__id=pk)
            profile.role = new_role
            profile.save()
            return Response(
                {'message': f"Updated role to '{new_role}' for user {pk}"},
                status=status.HTTP_200_OK
            )
        except Profile.DoesNotExist:
            return Response(
                {'error': 'User profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class UserBulkActionsAPIView(APIView):
    """
    Perform bulk actions on users
    Endpoint: PATCH /users/bulk_actions/
    Supports:
    - role: Update roles for multiple users
    - status: Activate/deactivate users
    """
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request):
        user_ids = request.data.get('user_ids', [])
        action = request.data.get('action')
        value = request.data.get('value')

        if not all([user_ids, action]):
            return Response(
                {'error': 'Missing required parameters'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            if action == 'role':
                updated = Profile.objects.filter(user_id__in=user_ids).update(role=value)
                return Response(
                    {'message': f'Updated roles for {updated} users'},
                    status=status.HTTP_200_OK
                )

            elif action == 'status':
                updated = User.objects.filter(id__in=user_ids).update(is_active=value)
                return Response(
                    {'message': f'Updated status for {updated} users'},
                    status=status.HTTP_200_OK
                )

            return Response(
                {'error': 'Invalid action type'},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
