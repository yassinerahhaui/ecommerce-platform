from django.contrib.postgres.fields import ArrayField
from django.db import models
from store.models import Product
from django.contrib.auth.models import User
from account.models import Wallet
from django.db.models.signals import post_save
from django.dispatch import receiver
import json
# Create your models here.

LOGISTICS = (
  ('WITH_SELER','WITH_SELER'),
  ('WITH_DILIVER','WITH_DILIVER'),
  ('CLIENT_ACCEPTED','CLIENT_ACCEPTED'),
  ('CLIENT_RETURNED','CLIENT_RETURNED'),
)

class Order(models.Model):
  user = models.ForeignKey(User,related_name='order_user',on_delete=models.PROTECT,null=True,blank=True)
  name = models.CharField(max_length=200,blank=True)
  address = models.TextField(max_length=2000,null=True,blank=True)
  country = models.CharField(max_length=70,blank=True)
  city = models.CharField(max_length=70,blank=True)
  email = models.EmailField(max_length=200,null=True,blank=True)
  phone = models.CharField(max_length=50,blank=True)
  products = models.CharField(max_length=100000,null=True)
  price = models.DecimalField(max_digits=10,decimal_places=2,null=True)
  completed = models.BooleanField(default=False)
  transaction_id = models.CharField(max_length=100,blank=True)
  logistics_tracking = models.CharField(max_length=100,choices=LOGISTICS,default='WITH_SELER')
  created_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'{self.user}'


class UserSales(models.Model):
  seller = models.ForeignKey(User,related_name='seler',on_delete=models.PROTECT,null=True)
  client = models.ForeignKey(User,related_name='client',on_delete=models.PROTECT,null=True,blank=True)
  product = models.ForeignKey(Product,related_name='client',on_delete=models.PROTECT,null=True)
  order = models.ForeignKey(Order,related_name='order_user',on_delete=models.PROTECT,null=True,blank=True)
  color = models.CharField(max_length=50,blank=True)
  size = models.CharField(max_length=50,blank=True)
  price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
  quantity = models.PositiveIntegerField(default=1)
  cache = models.BooleanField(default=False)
  logistic = models.CharField(max_length=100,choices=LOGISTICS,default='WITH_SELER')
  updated_at = models.DateTimeField(auto_now_add=True) 
  completed = models.BooleanField(default=False) 

  def __str__(self):
    return f'{self.seller}'

@receiver(post_save,sender=Order)
def create_sales(sender,instance,created,**kwargs):
  i = instance
  if created:
    for x in json.loads(i.products):
      product = Product.objects.get(pk=int(x['id']))
      product.quantity -= int(x['quantity'])
      product.save()
      seller = User.objects.get(pk=product.user.id)
      client = User.objects.get(pk=i.user.id)
      UserSales.objects.create(
        seller=seller,
        client=client,
        product=product,
        order=i,
        color=x['color'],
        size=x['size'],
        price=x['price'],
        quantity=x['quantity'],
      )



