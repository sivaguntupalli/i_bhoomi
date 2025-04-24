from rest_framework import viewsets
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from .models import Property
from .serializers import PropertySerializer
from .permissions import IsOwnerOrReadOnly

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsOwnerOrReadOnly]

    @extend_schema(
        operation_id='property_create',
        summary='Create new property',
        description='Creates a new property listing with the authenticated user as owner',
        examples=[
            OpenApiExample(
                'Example Request',
                value={
                    "title": "Beach Villa",
                    "property_type": "house",
                    "address": "123 Coastal Rd",
                    "price": 750000,
                    "status": "published",
                    "bedrooms": 3,
                    "bathrooms": 2.5
                },
                request_only=True
            )
        ],
        parameters=[
            OpenApiParameter(
                name='Authorization',
                type=str,
                location=OpenApiParameter.HEADER,
                description='JWT Token (format: Bearer <token>)',
                required=True
            )
        ]
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        operation_id='property_list',
        summary='List properties',
        parameters=[
            OpenApiParameter(
                name='property_type',
                type=str,
                location=OpenApiParameter.QUERY,
                description='Filter by property type (land, plot, flat, apartment)'
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)