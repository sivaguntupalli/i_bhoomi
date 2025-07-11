from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


class Property(models.Model):
    PROPERTY_TYPES = [
        ('LAND', 'Land'),
        ('PLOT', 'Plot'),
        ('FLAT', 'Flat'),
        ('VILLA', 'Villa'),
    ]

    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('SOLD', 'Sold'),
        ('RENTED', 'Rented'),
    ]

    # Core Fields
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=100)
    description = models.TextField()
    property_type = models.CharField(max_length=10, choices=PROPERTY_TYPES)
    address = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='DRAFT')
    square_footage = models.PositiveIntegerField(default=0)

    # Optional Fields
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    year_built = models.PositiveSmallIntegerField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)  # Useful for sorting/listing
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # Prevent setting bedrooms/bathrooms/year for land/plot
        if self.property_type in ['LAND', 'PLOT']:
            if self.bedrooms or self.bathrooms or self.year_built:
                raise ValidationError("LAND/PLOT properties cannot have bedrooms, bathrooms, or year built.")

    def __str__(self):
        return f"{self.title} ({self.property_type})"

    class Meta:
        ordering = ['-created_at']  # Latest listings first
        verbose_name_plural = "Properties"
