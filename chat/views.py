from django.shortcuts import render
from .models import ChatRoom,Message
from store.models import Product
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from account.models import ProfileUser
from django.contrib.auth.models import User
import json
# Create your views here.

@csrf_protect
def chat_product(request,id):
  if request.user.is_authenticated:
    product = Product.objects.get(pk=id)
    profile = ProfileUser.objects.get(user=request.user)
    selerProfile = ProfileUser.objects.get(user=product.user)
    
  try:
    room = list(ChatRoom.objects.filter(room_name=f'{profile.user}-_-{product.user}').values())
    if not room:
      room = list(ChatRoom.objects.filter(room_name=f'{product.user}-_-{profile.user}').values())
      if not room:
        if product.user == profile.user:
          pass
        else:
          ChatRoom.objects.create(
            profile=profile,
            product=product,
            seler=product.user,
            seler_image=selerProfile.image,
            user_image=profile.image,
            seler_gender=selerProfile.gender,
            user_gender=profile.gender,
            seler_name=product.user,
            user_name=profile.user,
            room_name=f'{profile.user}-_-{product.user}')
          room = list(ChatRoom.objects.filter(room_name=f'{profile.user}-_-{product.user}').values())
  except:
    room = 'something is wrong!'
  return JsonResponse({'chat_room':room})

@csrf_protect
def chat_rooms(request):
  if request.user.is_authenticated:
    rooms = list(ChatRoom.objects.filter(seler_name=request.user).order_by('-updated_at').values())
    rooms2 = list(ChatRoom.objects.filter(user_name=request.user).order_by('-updated_at').values())
    rooms.extend(rooms2)
    return JsonResponse({'rooms':rooms,'active_user': f'{request.user}'})
  return JsonResponse({'rooms':'somthing is wrong!','active_user': 'anonymous'})

@csrf_protect
def chat_room_messages(request,id):
  try:
    messages = list(Message.objects.filter(room=id).order_by('created_at').values())
  except:
    messages = 'somthing is wrong!'
  return JsonResponse({'messages':messages,'active_user': f'{request.user.id}'})

@csrf_protect
def send_message(request,id):
  user = User.objects.get(pk=request.user.id)
  chat_room = ChatRoom.objects.get(pk=id)
  if request.method == 'POST':
    data = json.loads(request.body)
    Message.objects.create(user=request.user,room=chat_room,message=data['message'])
    return JsonResponse({'success':'data success'})
  