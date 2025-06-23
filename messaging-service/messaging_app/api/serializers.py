from rest_framework import serializers
from ..models import Message, ChatRoom

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'timestamp', 'read', 'room']
        read_only_fields = ['id', 'timestamp']

class ChatRoomSerializer(serializers.ModelSerializer):
    operator = serializers.StringRelatedField()
    participants = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'operator', 'participants', 'created_at']
        read_only_fields = ['created_at']