from django.urls import path
from . import views

app_name='orders'

urlpatterns = [
  path('dashboard',views.user_dashboard,name='user_dashboard'),
  path('user/sales',views.user_sales,name='user_sales'),
  path('client/info/<int:id>',views.client_info,name='client_info'),
  path('user/purchases',views.user_purchases,name='user_purchases'),
  path('client/review/<int:id>',views.client_review,name='client_review'),
  path('client/review/comment/<int:id>',views.client_review_comment,name='client_review_comment'),
  path('create/paypal/order',views.paypal_order,name='paypal_order'),
  path('client/info/paypal/<str:transId>',views.paypal_order_add_info,name='paypal_order_add_info'),
]

