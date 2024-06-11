from django.db import models
from django.contrib.auth.models import User
from store.models import Product
from account.models import ProfileUser
# Create your models here.
class ChatRoom(models.Model):
  profile = models.ForeignKey(ProfileUser,related_name='chat_user',on_delete=models.DO_NOTHING,null=True)
  product = models.ForeignKey(Product,related_name='chat_seler',on_delete=models.DO_NOTHING,null=True)
  seler = models.ForeignKey(User,related_name='product_chat_user',on_delete=models.DO_NOTHING,null=True)
  room_name = models.CharField(max_length=1000,blank=True)
  seler_image = models.CharField(max_length=1000,blank=True)
  user_image = models.CharField(max_length=1000,blank=True)
  seler_gender = models.CharField(max_length=20,blank=True)
  user_gender = models.CharField(max_length=20,blank=True)
  seler_name = models.CharField(max_length=200,blank=True)
  user_name = models.CharField(max_length=200,blank=True)
  updated_at = models.DateTimeField(auto_now_add=True)


  def __str__(self):
    return self.room_name


class Message(models.Model):
  user = models.ForeignKey(User,related_name="user_message",on_delete=models.DO_NOTHING,null=True)
  room = models.ForeignKey(ChatRoom,related_name='chat_room',on_delete=models.CASCADE,null=True)
  message = models.TextField(max_length=10000,null=True)
  created_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return str(self.user)

