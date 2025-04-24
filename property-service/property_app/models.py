from django.db import models
from django.contrib.auth.models import User

class Property(models.Model):
    # Property Types (existing)
    PROPERTY_TYPES = [
        ('land', 'Land'),
        ('plot', 'Plot'),
        ('flat', 'Flat'),
        ('apartment', 'Apartment'),
    ]
    
    # Status Choices (new)
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('sold', 'Sold'),
        ('rented', 'Rented')
    ]

    # Core Fields (existing)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    address = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    listed_on = models.DateTimeField(auto_now_add=True)

    # New Fields
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )
    square_footage = models.PositiveIntegerField(null=True, blank=True)
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    bathrooms = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        null=True,
        blank=True
    )
    year_built = models.PositiveSmallIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title