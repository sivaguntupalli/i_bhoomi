from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.views import APIView
from django.db.models import Count
from ..models import Message, ChatRoom
from .serializers import MessageSerializer, ChatRoomSerializer

class MessageListCreateView(generics.ListCreateAPIView):
    """
    List all messages or create a new message
    """
    queryset = Message.objects.all().order_by('-timestamp')
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender_id=self.request.user.id)

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a message instance
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        # Only allow deletion by sender or admin
        if self.request.user.id == instance.sender_id or self.request.user.is_staff:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

class RoomListView(generics.ListAPIView):
    """
    List all chat rooms with participant count
    """
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return ChatRoom.objects.annotate(
            participant_count=Count('participants')
        ).all()

class RoomDetailView(generics.RetrieveAPIView):
    """
    Retrieve specific chat room details
    """
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

class RoomJoinAPIView(APIView):
    """
    Allow authenticated users to join a room
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id)
            if not room.participants.filter(id=request.user.id).exists():
                room.participants.add(request.user.id)
                return Response(
                    {"status": "joined", "room": room.name},
                    status=status.HTTP_200_OK
                )
            return Response(
                {"status": "already_member"},
                status=status.HTTP_200_OK
            )
        except ChatRoom.DoesNotExist:
            return Response(
                {"error": "Room not found"},
                status=status.HTTP_404_NOT_FOUND
            )

class RoomLeaveAPIView(APIView):
    """
    Allow authenticated users to leave a room
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, room_id):
        try:
            room = ChatRoom.objects.get(id=room_id)
            if room.participants.filter(id=request.user.id).exists():
                room.participants.remove(request.user.id)
                return Response(
                    {"status": "left", "room": room.name},
                    status=status.HTTP_200_OK
                )
            return Response(
                {"error": "Not a member of this room"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except ChatRoom.DoesNotExist:
            return Response(
                {"error": "Room not found"},
                status=status.HTTP_404_NOT_FOUND
            )

class RoomParticipantsView(generics.ListAPIView):
    """
    List all participants in a room
    """
    serializer_class = serializers.StringRelatedField(many=True)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        room_id = self.kwargs['room_id']
        return ChatRoom.objects.get(id=room_id).participants.all()