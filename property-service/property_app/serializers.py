from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,  # Prevents owner from being set via API input
        default=serializers.CurrentUserDefault()  # Auto-sets from request
    )
    
    class Meta:
        model = Property
        fields = '__all__'