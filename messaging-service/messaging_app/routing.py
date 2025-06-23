from django.urls import re_path
from .consumers.agent_chat import AgentChatConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/$', AgentChatConsumer.as_asgi()),
]
