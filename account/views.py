from django.shortcuts import render, redirect
from .forms import SignUpForm,UserForm,ProfileForm
from django.contrib.auth import authenticate,login
from .models import ProfileUser, Wallet, Transaction
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from store.models import Product
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect

pLen = 16

def signup(request):
  if not request.user.is_authenticated:
    if request.method == 'POST':
      form = SignUpForm(request.POST)
      if form.is_valid():
        form.save()
        username = form.cleaned_data['username']
        password = form.cleaned_data['password1']
        user = authenticate(username=username,password=password)
        login(request,user)
        return redirect('/accounts/profile')
    else:
      form = SignUpForm()
    context = {'form':form}
  else:
    return redirect('/accounts/profile')
  return render(request,'registration/signup.html',context)

def profile(request,pk):
  profile = ProfileUser.objects.get(user=pk)
  user = User.objects.get(pk=pk)
  context = {
    'userprofile': profile,
    'user': user,
  }
  return render(request,'registration/profile.html',context)

def profile_products(request,pk):
  if request.method == 'GET':
    products = list(Product.objects.filter(user=pk).order_by('-id').values())
    # pLen = 2
    page = int(request.GET.get('page'))
    pages = len(products) / pLen
    end = page * pLen
    start = end - pLen
    if len(products) > 0:
      return JsonResponse({'results':products[start:end],'pages':pages,'page':page})
    return JsonResponse({'results':'no products!'})
  return JsonResponse({'errror':'invalid request!'})

@login_required(login_url='/accounts/login')
def profile_edit(request):
  profile = ProfileUser.objects.get(user=request.user)
  if request.method == 'POST':
    userform = UserForm(request.POST,request.FILES,instance=request.user)
    profileform = ProfileForm(request.POST,request.FILES,instance=profile)
    if userform.is_valid() and profileform.is_valid():
      userform.save()
      myform = profileform.save(commit=False)
      myform.user = request.user
      myform.save()
      return redirect('/accounts/profile')
  else:
    userform = UserForm(instance=request.user)
    profileform = ProfileForm(instance=profile)
  context = {
    'userform': userform,
    'profileform': profileform,
  }
  return render(request,'registration/profile_edit.html',context)
 
@login_required(login_url='/accounts/login')
def profile_products_edit(request):
  if request.method == 'GET':
    user = User.objects.get(pk=request.user.id)
    user_id = user.id
    products = list(Product.objects.filter(user=request.user).order_by('-id').values())
    # pLen = 2
    page = int(request.GET.get('page'))
    pages = len(products) / pLen
    end = page * pLen
    start = end - pLen
    if len(products) > 0:
      return JsonResponse({'results':products[start:end],'pages':pages,'page':page,'user':user_id})
    return JsonResponse({'results':'no products!','user':user_id})
  return JsonResponse({'errror':'invalid request!'})


@csrf_protect
def wallet(request):
  if request.user.is_authenticated:
    user = User.objects.get(pk=request.user.id)
    wallet = list(Wallet.objects.filter(user=user.id).values())
    obj = list(Transaction.objects.filter(seler=user.id).order_by('-created_at').values())
    obj2 = list(Transaction.objects.filter(sender=user.id).order_by('-created_at').values())
    obj.extend(obj2)
    for x in obj:
      seler = User.objects.get(pk=int(x['seler_id']))
      sender = User.objects.get(pk=int(x['sender_id']))
      x['seler_id'] = f'{seler.username}'
      x['sender_id'] = f'{sender.username}'
    if len(obj) > 0:
      return JsonResponse({'wallet':wallet,'transactions':obj})
    else:
      return JsonResponse({'wallet':wallet,'transactions':'no transactions'})
  return JsonResponse({'wallet':'please login','transactions':'[]'})
