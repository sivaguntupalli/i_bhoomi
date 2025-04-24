from django.contrib import admin
from .models import Property  # Add this import

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'price', 'bedrooms', 'bathrooms')
    list_filter = ('status', 'property_type')