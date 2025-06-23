from ..models.chat import Message

def get_unread_messages(user):
    return Message.objects.filter(receiver=user, is_read=False)

def mark_as_read(message_id):
    Message.objects.filter(id=message_id).update(is_read=True)