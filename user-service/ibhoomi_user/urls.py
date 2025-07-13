from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Routes (versionless for now)
    path('api/', include([
        path('users/', include('user_app.urls')),  # ✅ /api/users/register/
        
        # API Documentation
        path('schema/', SpectacularAPIView.as_view(), name='schema'),
        path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    ])),
]
