from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from messaging_app.models import Message, ChatRoom

class AgentChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)

            # Save message to DB
            await self.save_message(
                message=data.get("message"),
                sender=data.get("sender", "anonymous"),
                chat_room_id=data.get("chat_room_id", 1),
            )

            await self.send(text_data=json.dumps({
                "status": "success",
                "message": data.get("message"),
                "timestamp": data.get("timestamp"),
                "sender": data.get("sender", "anonymous")
            }))

        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                "status": "error",
                "message": "Invalid JSON"
            }))

    @sync_to_async
    def save_message(self, message, sender, chat_room_id):
        Message.objects.create(
            content=message,
            sender_id=sender,      # sender should be a user ID
            room_id=chat_room_id   # room_id should match ChatRoom's id
        )
