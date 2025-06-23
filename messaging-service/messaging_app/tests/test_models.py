from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import ChatRoom, Message

class ModelTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='test', password='testpass')
        self.room = ChatRoom.objects.create(name='Test Room')

    def test_chatroom_creation(self):
        self.assertEqual(str(self.room), 'Test Room')

    def test_message_creation(self):
        msg = Message.objects.create(
            room=self.room,
            sender=self.user,
            content="Test message"
        )
        self.assertTrue(msg.read is False)
        self.assertEqual(msg.room, self.room)