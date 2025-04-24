from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('property_app.urls')),
    path('api-auth/', include('rest_framework.urls')),  # Basic DRF auth
    
    # OpenAPI Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema')),
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema')),
]