from django.urls import path
from . import views
app_name = 'accounts'

urlpatterns = [
  path('signup',views.signup,name='signup'),
  path('profile/<int:pk>',views.profile,name='profile'),
  path('profile/products',views.profile_products_edit,name='profile_products'),
  path('profile/products/<int:pk>',views.profile_products,name='profile_products_users'),
  path('profile',views.profile_edit,name='profile_edit'),
  path('dashboard/wallet',views.wallet,name='wallet'),
]