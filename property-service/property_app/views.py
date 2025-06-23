from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from .models import Property
from .serializers import PropertySerializer
from .permissions import IsOwnerOrReadOnly

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsOwnerOrReadOnly]

    @extend_schema(
        operation_id="property_create",
        summary="Create new property",
        description="Creates a new property listing with the authenticated user as the owner",
        examples=[
            OpenApiExample(
                "Example Request",
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
                name="Authorization",
                type=str,
                location=OpenApiParameter.HEADER,
                description="JWT Token (format: Bearer <token>)",
                required=True
            )
        ]
    )
    def create(self, request, *args, **kwargs):
        """Ensure the authenticated user is set as the property owner"""
        return super().create(request, *args, **kwargs)

    @extend_schema(
        operation_id="property_list",
        summary="List properties",
        parameters=[
            OpenApiParameter(
                name="property_type",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Filter by property type (land, plot, flat, apartment)"
            ),
            OpenApiParameter(
                name="min_price",
                type=int,
                location=OpenApiParameter.QUERY,
                description="Minimum price filter"
            ),
            OpenApiParameter(
                name="max_price",
                type=int,
                location=OpenApiParameter.QUERY,
                description="Maximum price filter"
            ),
            OpenApiParameter(
                name="location",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Filter by location"
            ),
            OpenApiParameter(
                name="sort_by",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Sort properties by price_asc, price_desc, newest"
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        """Custom API response with search, filtering & sorting support"""
        queryset = self.get_queryset()

        # Apply filters
        property_type = request.query_params.get("property_type")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        location = request.query_params.get("location")
        sort_by = request.query_params.get("sort_by")

        if property_type:
            queryset = queryset.filter(property_type=property_type)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if location:
            queryset = queryset.filter(address__icontains=location)

        # Sorting Logic
        if sort_by == "price_asc":
            queryset = queryset.order_by("price")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-price")
        elif sort_by == "newest":
            queryset = queryset.order_by("-id")  # Assuming latest listings have highest IDs

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        """Ensure the authenticated user is set as the property owner"""
        serializer.save(owner=self.request.user)
