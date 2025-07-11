from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Current API endpoints (without version in path)
    path('api/', include([
        path('users/', include('user_app.urls')),
        path('auth/', include('user_app.auth_urls')),
        
        # Documentation
        path('schema/', SpectacularAPIView.as_view()),
        path('docs/', SpectacularSwaggerView.as_view()),
    ])),
    
]