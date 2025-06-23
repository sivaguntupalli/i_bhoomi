from django.urls import path
from . import views

urlpatterns = [
    path('messages/', views.MessageListCreateView.as_view()),
    path('messages/<int:pk>/', views.MessageDetailView.as_view()),

    path('rooms/<int:room_id>/join/', views.RoomJoinAPIView.as_view()),
    path('rooms/<int:room_id>/leave/', views.RoomLeaveAPIView.as_view()),
]