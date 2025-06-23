from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

class ChatRoom(models.Model):
    name = models.CharField(max_length=100)
    operator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='operated_rooms',
        null=True,  # Temporary for migration
        blank=True  # Temporary for migration
    )
    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='chat_rooms'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} (Operator: {self.operator.username if self.operator else 'None'})"

class Message(models.Model):
    class MessageTypes(models.TextChoices):
        USER = 'user', 'User Message'
        OPERATOR = 'operator', 'Operator Relay'
        SYSTEM = 'system', 'System Notification'

    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)  # Kept original field name
    message_type = models.CharField(
        max_length=10,
        choices=MessageTypes.choices,
        default=MessageTypes.USER
    )

    class Meta:
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['room', 'timestamp']),
        ]

    def __str__(self):
        return f"{self.get_message_type_display()} in {self.room.name} by {self.sender.username}"