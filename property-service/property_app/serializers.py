from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.property_type in ['LAND', 'PLOT']:
            for field in ['bedrooms', 'bathrooms', 'year_built']:
                data.pop(field, None)
        return data