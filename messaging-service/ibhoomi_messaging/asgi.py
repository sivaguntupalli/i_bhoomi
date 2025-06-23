import os
import django
from django.core.asgi import get_asgi_application

# Configure Django FIRST
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ibhoomi_messaging.settings')
django.setup()

# Then import ASGI components
from channels.routing import ProtocolTypeRouter, URLRouter
import messaging_app.routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        messaging_app.routing.websocket_urlpatterns
    ),
})