# messaging-service/test_service.py
from src.services.message_service import MessageService

def test_messaging():
    service = MessageService()
    
    print("\n=== Testing MessageService ===")
    
    # Send test message
    msg = service.send_message("test_chat", "user1", "Hello from tester!")
    print(f"Sent message with ID: {msg['id']}")
    
    # Retrieve messages
    messages = service.get_recent_messages("test_chat")
    print(f"\nRecent messages in test_chat:")
    for m in messages:
        print(f"- {m['sender']}: {m['text']}")
    
    # Unread count demo
    print(f"\nUnread count for user2:", 
          service.get_unread_count("test_chat", "user2"))

if __name__ == "__main__":
    test_messaging()