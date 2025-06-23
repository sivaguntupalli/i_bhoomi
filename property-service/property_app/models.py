from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

class Property(models.Model):
    PROPERTY_TYPES = [
        ('LAND', 'Land'),
        ('PLOT', 'Plot'), 
        ('FLAT', 'Flat'),
        ('VILLA', 'Villa')
    ]
    
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('SOLD', 'Sold'),
        ('RENTED', 'Rented')
    ]

    # Core Fields
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    property_type = models.CharField(max_length=10, choices=PROPERTY_TYPES)
    address = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='DRAFT')
    square_footage = models.IntegerField(default=0)
    
    # Conditional Fields
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    year_built = models.PositiveSmallIntegerField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def clean(self):
        if self.property_type in ['LAND', 'PLOT'] and any([self.bedrooms, self.bathrooms, self.year_built]):
            raise ValidationError("Land/Plot cannot have bedrooms, bathrooms, or year built.")
        
    def __str__(self):
        return self.title