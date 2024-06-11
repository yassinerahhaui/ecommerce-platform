from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from .models import Order, UserSales
from store.models import Product, ReviewsResultInfo, ProductRatting
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from account.models import ProfileUser
from .forms import OrderForm

import json

@login_required(login_url='/accounts/login')
def user_dashboard(request):
  return render(request,'orders/dashboard.html',{})

@csrf_protect
def user_sales(request):
  sales = list(UserSales.objects.filter(seller=request.user).values())
  products = []
  for sale in sales:
    products.extend(list(Product.objects.filter(pk=int(sale['product_id'])).values()))
  if len(sales) > 0:
    return JsonResponse({'result':list(products),'user_sales':sales})
  else:
    return JsonResponse({'result':list(products),'user_sales':'no sales'})

@csrf_protect
def client_info(request,id):
  info = list(Order.objects.filter(pk=id).values())
  return JsonResponse({'info':info})

@csrf_protect
def paypal_order(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    Order.objects.create(user=request.user,products=data['products'],price=data['price'],transaction_id=data['transaction_id'])
    return JsonResponse({'result':'success'})

def paypal_order_add_info(request,transId):
  order = Order.objects.get(transaction_id=transId)
  if request.method == 'POST':
    form = OrderForm(request.POST,instance=order)
  else:
    form = OrderForm(instance=order)
  context = {
    'order': order,
    'form': form,
  }
  return render(request,'orders/user_info.html',context)



@csrf_protect
def user_purchases(request):
  purchases = list(UserSales.objects.filter(client=request.user).order_by('-updated_at').values())
  products = []
  for purchase in purchases:
    products.extend(list(Product.objects.filter(pk=int(purchase['product_id'])).values()))
  return JsonResponse({'products':products,'user_purcheses':purchases})

@csrf_protect
def client_review(request,id):
  product_review_info = ReviewsResultInfo.objects.get(product=id)
  client = User.objects.get(username=request.user)
  profile = ProfileUser.objects.get(user=client)
  unique_review = f'{product_review_info}_{client}_{product_review_info.id}_{client.id}'
  try:
    product_ratting = ProductRatting.objects.get(uniqueReview=unique_review)
  except:
    product_ratting = False

  if request.method == 'GET':
    if product_ratting:
      stars = product_ratting.stars
      return JsonResponse({'result': stars})
    return JsonResponse({'result': 0})

  if request.method == 'POST':
    data = json.loads(request.body)
    if product_ratting:
      product_ratting.stars = float(data['stars'])
      product_ratting.save()
    else:
      ProductRatting.objects.create(
        reviewInfo=product_review_info,
        user=client,
        profile=profile,
        stars=float(data['stars']),
      )
  return JsonResponse({'result': float(data['stars'])})

def client_review_comment(request,id):
  product_review_info = ReviewsResultInfo.objects.get(product=id)
  client = User.objects.get(username=request.user)
  profile = ProfileUser.objects.get(user=client)
  unique_review = f'{product_review_info}_{client}_{product_review_info.id}_{client.id}'
  try:
    product_ratting = ProductRatting.objects.get(uniqueReview=unique_review)
  except:
    product_ratting = False
  
  if request.method == 'GET':
    if product_ratting:
      comment = product_ratting.comment
      return JsonResponse({'result':comment})
    return JsonResponse({'result': ''})
  
  if request.method == 'POST':
    data = json.loads(request.body)
    if product_ratting:
      product_ratting.comment = data['comment']
      product_ratting.save()
    else:
      ProductRatting.objects.create(
        reviewInfo=product_review_info,
        user=client,
        profile=profile,
        stars=0,
        comment=data['comment']
      )
  return JsonResponse({'result': data['comment']})






  
