import requests
from django.conf import settings

def validate_token(token):
    try:
        response = requests.post(
            f"{settings.USER_SERVICE_URL}/validate-token/",
            json={"token": token},
            timeout=3  # Add timeout
        )
        return response.json().get('user_id')  # Ensure this matches user-service response
    except Exception as e:
        print(f"Token validation failed: {str(e)}")  # Log the error
        return None