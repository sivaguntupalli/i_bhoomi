# messaging_app/admin.py
from django.contrib import admin
from .models import ChatRoom, Message

@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'participants__username')
    filter_horizontal = ('participants',)  # For easier user management

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'room', 'sender', 'timestamp', 'truncated_content')
    list_filter = ('room', 'sender', 'timestamp')
    search_fields = ('content', 'sender__username')
    date_hierarchy = 'timestamp'

    def truncated_content(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    truncated_content.short_description = 'Content Preview'