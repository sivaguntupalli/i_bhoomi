# filepath: user-service/user_app/apps.py

from django.apps import AppConfig

class UserAppConfig(AppConfig):
    name = 'user_app'

    def ready(self):
        import user_app.signals