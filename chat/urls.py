from django.urls import path
from . import views
app_name='chat'

urlpatterns = [
  path('product/<int:id>',views.chat_product,name='chat_product'),
  path('rooms',views.chat_rooms,name='chat_rooms'),
  path('room/<int:id>/messages',views.chat_room_messages,name='chat_room_messages'),
  path('room/<int:id>/message/send',views.send_message,name='send_message'),
]

