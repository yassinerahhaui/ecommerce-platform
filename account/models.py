from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid


def image_profile_upload(instance,filename):
  ext = filename.split('.')[-1]
  i = instance
  return f'user/{i.user}/profile/{uuid.uuid4()}.{ext}'

SEX_CHOICES = (
  ('WOMEN','WOMEN'),
  ('MEN','MEN'),
)

SELER_RANK = (
  ('NEW SELER','NEW SELER'),
  ('L1 SELER','L1 SELER'),
  ('L2 SELER','L2 SELER'),
  ('BEST SELER','BEST SELER'),
)


class ProfileUser(models.Model):
  user = models.OneToOneField(User,related_name='profileuser',on_delete=models.CASCADE,null=True)
  seler_rank = models.CharField(max_length=10,null=True,choices=SELER_RANK)
  image = models.ImageField(upload_to=image_profile_upload,max_length=300,null=True,blank=True)
  cover =  models.ImageField(upload_to=image_profile_upload,max_length=300,null=True,blank=True)
  phone = models.CharField(max_length=20,null=True,blank=True)
  gender = models.CharField(max_length=10,choices=SEX_CHOICES,null=True,blank=True)
  age = models.IntegerField(null=True,blank=True)
  country = models.CharField(max_length=50,null=True,blank=True)
  city = models.CharField(max_length=50,null=True,blank=True)
  address = models.TextField(max_length=500,null=True,blank=True)
  brand = models.CharField(max_length=20,blank=True)
  def __str__(self):
    return str(self.user)

class Wallet(models.Model):
  user = models.OneToOneField(User,related_name='user_wallet',on_delete=models.CASCADE,null=True)
  money = models.FloatField(default=0.0)
  updated_at = models.DateTimeField(auto_now_add=True,null=True)

  def __str__(self):
    return f'{self.user}'

class Transaction(models.Model):
  seler = models.ForeignKey(Wallet,related_name='seler_wallet',on_delete=models.DO_NOTHING,null=True)
  sender = models.ForeignKey(Wallet,related_name='sender_wallet',on_delete=models.DO_NOTHING,null=True)
  created_at = models.DateTimeField(auto_now=True)
  money = models.FloatField(default=0.0)
  def __str__(self):
    return f'{self.sender} >> {self.seler} :: {self.money}$'

@receiver(post_save,sender=Transaction)
def update_wallet(sender,instance,created,**kwargs):
  if created:
    sender = Wallet.objects.get(id=instance.sender.id)
    seler = Wallet.objects.get(id=instance.seler.id)
    if sender.money >= instance.money:
      sender.money -= instance.money
      seler.money += instance.money
      seler.save()
      sender.save()

@receiver(post_save,sender=User)
def create_profile(sender,instance,created,**kwargs):
  if created:
    ProfileUser.objects.create(user=instance)
    Wallet.objects.create(user=instance)
