from django.shortcuts import render, redirect
from .models import CategoryParent, Product, ProductImage, ReviewsResultInfo, ProductRatting
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from .forms import ProductForm, ProductImagesForm
from orders.models import Order, UserSales
from orders.forms import OrderForm
import json

# Create your views here.
def store(request):
  category = CategoryParent.objects.all()
  context = {
    'categories': category
  }
  return render(request,'store/home.html',context)

def product_details(request,pk):
  obj = Product.objects.get(pk=pk)
  images = ProductImage.objects.get(product=pk)
  reviewinfo = ReviewsResultInfo.objects.get(product=pk)
  comment = ProductRatting.objects.filter(reviewInfo=reviewinfo.pk)
  if request.method == 'POST':
    form = OrderForm(request.POST)
    if form.is_valid():
      if request.user.is_authenticated:
        newform = form.save(commit=False)
        newform.user = request.user
        newform.save()
        return redirect('/shopping-cart/clear')
  else:
    form = OrderForm()
  context = {
    'product': obj,
    'images': images,
    'comment': comment,
    'form': form,
  }
  return render(request,'product_details/product_details.html',context)

@login_required(login_url='/accounts/login')
def shopping_cart(request):
  if request.method == 'POST':
    form = OrderForm(request.POST)
    if form.is_valid():
      if request.user.is_authenticated:
        newform = form.save(commit=False)
        newform.user = request.user
        newform.save()
        return redirect('/shopping-cart/clear')
  else:
    form = OrderForm()
  context = {'form': form}
  return render(request,'shopping_cart/shopping_cart.html',context)

def sitemap(request):
  return render(request,'sitemap.xml',{})

def robots_txt(request):
  return render(request,'robots.txt',{})

def clear_shopping_cart(request):
  return render(request,'shopping_cart/clear_shopping_cart.html',{})

def product_list(request,pk):
  return render(request,'product_list/product_list.html',{})

@login_required(login_url='/accounts/login')
def favorite(request):
  return render(request,'favorite/favorite.html',{})

pLen = 16

@csrf_protect
def product_list_by_category(request,pk):
  if request.method == 'GET':
    products = list(Product.objects.filter(category_parent=pk).order_by('-score').values())
    page = int(request.GET.get('page'))
    pages = len(products) / pLen
    end = page * pLen
    start = end - pLen
    if len(products) > 0:
      return JsonResponse({'results':products[start:end],'pages':pages,'page':page})
    return JsonResponse({'results':'no products!'})
  return JsonResponse({'error':'invalid request!'})


@csrf_protect
@login_required(login_url='/accounts/login')
def product_delete(request,id):
  if request.method == 'DELETE':
    product = Product.objects.get(pk=id)
    if product.user == request.user:
      orders = UserSales.objects.filter(product=product)
      if len(orders) < 1:
        product.delete()
        return JsonResponse({'result': 'product deleted!'})
      return JsonResponse({'result': 'product not deleted!'})
    return JsonResponse({'result': 'product not deleted!'})

@csrf_protect
def product_details_slider(request,id):
  product = Product.objects.get(pk=id)
  products = list(Product.objects.filter(category_parent=product.category_parent).order_by('-score').values())
  return JsonResponse({'slider':products[:20]})

@csrf_protect
def product_filter(request,pk):
  if request.method == 'GET':
    page = int(request.GET.get('page'))
    name = request.GET.get('name')
    price_gt = request.GET.get('price_gt')
    price_lt = request.GET.get('price_lt')
    try:
      price_gt = int(price_gt)
      price_lt = int(price_lt)
    except:
      price_gt = 0
      price_lt = 100000
      
    products_en = list(Product.objects.filter(category_parent=pk,name_en__icontains=name,price__gt=price_gt,price__lt=price_lt).order_by('-score').values())
    products_ar = list(Product.objects.filter(category_parent=pk,name_ar__icontains=name,price__gt=price_gt,price__lt=price_lt).order_by('-score').values())
    products_fr = list(Product.objects.filter(category_parent=pk,name_fr__icontains=name,price__gt=price_gt,price__lt=price_lt).order_by('-score').values())
    products = []
    products.extend(products_en)
    for x in products_ar:
      if x not in products:
        products.append(x)
    for x in products_fr:
      if x not in products:
        products.append(x)
    # pLen = 2
    pages = len(products) / pLen
    end = page * pLen
    start = end - pLen
    return JsonResponse({'results':products[start:end],'pages':pages,'page':page})
  return JsonResponse({'error':'invalid request!'})

@csrf_protect
def product_list_home(request):
  if request.method == 'GET':
    products = list(Product.objects.all().order_by('-score').values())
    page = int(request.GET.get('page'))
    pages = len(products) / pLen
    end = page * pLen
    start = end - pLen
    if len(products) > 0:
      return JsonResponse({'results':products[start:end],'pages':pages,'page':page})
    return JsonResponse({'results':'no products!'})
  return JsonResponse({'error':'invalid request!'})

@csrf_protect
def product_details_api(request,pk):
  if request.method == 'GET':
    pr = Product.objects.get(pk=pk)
    pr.score_search += 1
    pr.save()
    product = list(Product.objects.filter(id=pk).values())
    return JsonResponse({'results':product})
  return JsonResponse({'error':'invalid request!'})


@csrf_protect
def add_to_favorite(request,id):
  product = Product.objects.get(pk=id)
  if request.method == 'PUT':
    favorite = True
    if request.user in product.like.all():
      product.like.remove(request.user)
      product.score_like -= 2
      product.save()
      favorite = False
    else:
      product.like.add(request.user)
      product.score_like += 2
      product.save()
      favorite = True
    return JsonResponse({'favorite':favorite})
  return JsonResponse({'error':'invalid request!'})

def in_favorite(request,id):
  product = Product.objects.get(pk=id)
  if request.method == 'GET':
    favorite = True
    if request.user in product.like.all():
      favorite = True
    else:
      favorite = False
    return JsonResponse({'favorite':favorite})
  return JsonResponse({'error':'invalid request!'})

@csrf_protect
def favorite_list(request):
  if request.method == 'GET':
    products = list(Product.objects.filter(like=request.user).values())
    page = int(request.GET.get('page'))
    pages = len(products) / pLen
    end = page * pLen
    start = end - pLen
    if len(products) > 0:
      return JsonResponse({'results':products[start:end],'pages':pages,'page':page})
    return JsonResponse({'results':'no products!'})
  return JsonResponse({'error':'invalid request!'})

@csrf_protect
def category_list(request):
  if request.method == 'GET':
    category = list(CategoryParent.objects.all().values())
    return JsonResponse({'category':category})
  return JsonResponse({'error':'invalid request!'})

@csrf_protect
def product_reviews_info(request,id):
  if request.method == 'GET':
    reviews_info = list(ReviewsResultInfo.objects.filter(product=id).values())
    return JsonResponse({'reviews_info': reviews_info})
  return JsonResponse({'error':'invalid request!'})

@login_required(login_url='/accounts/login')
def new_product(request):
  if request.method == 'POST':
    form = ProductForm(request.POST,request.FILES)
    if form.is_valid():
      newform = form.save(commit=False)
      newform.user = request.user
      newform.save()
      id = newform.id
      return redirect(f'/product/images/{id}')
  else:
    form = ProductForm()
  context = {
    'form':form
  }
  return render(request,'new_product/new_product.html',context)

@login_required(login_url='/accounts/login')
def new_product_images(request,id):
  images = ProductImage.objects.get(product=id)
  product = Product.objects.get(id=id)
  if product.user == request.user:
    if request.method == 'POST':
      form = ProductImagesForm(request.POST,request.FILES,instance=images)
      if form.is_valid():
        form.save()
        return redirect(f'/product/details/{id}')
    else:
      form = ProductImagesForm(instance=images)
    context = {
      'form': form,
      'product': product,
    }
  else:
    return redirect('/accounts/profile')
  return render(request,'new_product/new_product_images.html',context)

@login_required(login_url='/accounts/login')
def edit_product(request,id):
  product = Product.objects.get(pk=id)
  images = ProductImage.objects.get(product=id)
  if product.user == request.user:
    if request.method == 'POST':
      productform = ProductForm(request.POST,request.FILES,instance=product)
      imagesform = ProductImagesForm(request.POST,request.FILES,instance=images)
      if productform.is_valid() and imagesform.is_valid():
        newproductform = productform.save(commit=False)
        newproductform.user = request.user
        newproductform.save()
        imagesform.save()
        return redirect(f'/product/details/{id}')
    else:
      productform = ProductForm(instance=product)
      imagesform = ProductImagesForm(instance=images)
    context = {
      'productform': productform,
      'imagesform': imagesform,
    }
  else:
    return redirect('/accounts/profile')
  return render(request,'edit_product/edit_product.html',context)
  

@csrf_protect
def search_engine(request):
  if request.method == 'GET':
    name = request.GET.get('name')
    if len(name) > 0:
      products_en = list(Product.objects.filter(name_en__icontains=name).order_by('-score').values())
      products_ar = list(Product.objects.filter(name_ar__icontains=name).order_by('-score').values())
      products_fr = list(Product.objects.filter(name_fr__icontains=name).order_by('-score').values())
      products = []
      products.extend(products_en)
      for x in products_ar:
        if x not in products:
          products.append(x)
      for x in products_fr:
        if x not in products:
          products.append(x)
      return JsonResponse({'results_10':products[:10],'results': products})
  return JsonResponse({'results':'no response!'})

def search_engine_page(request):
  return render(request,'search_engine/search_page.html',{})

