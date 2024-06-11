from django.urls import path
from . import views
from . import api
app_name='store'

urlpatterns = [
  path('',views.store,name='home'),
  path('api/product/list',views.product_list_home,name='product_list_api'),
  path('product/details/<int:pk>',views.product_details,name="product_details"),
  path('api/product/details/<int:pk>',views.product_details_api,name='product_details_api'),
  path('product/details/reviews/info/<int:id>',views.product_reviews_info,name='product_reviews_info'),
  path('shopping-cart',views.shopping_cart,name="shopping_cart"),
  path('shopping-cart/clear',views.clear_shopping_cart,name='clear_shopping_cart'),
  path('product/list/<int:pk>',views.product_list,name="product_list"),
  path('product/list/category/<int:pk>',views.product_list_by_category,name="product_list_category"),
  path('product/list/filter/<int:pk>',views.product_filter,name='product_filter'),
  path('add-to-favorite/<int:id>',views.add_to_favorite,name='add_to_favorite'),
  path('in-favorite/<int:id>',views.in_favorite,name='in_favorite'),
  path('favorite',views.favorite,name='favorite'),
  path('favorite/list',views.favorite_list,name='favorite_list'),
  path('category/list',views.category_list,name='category_list'),
  path('product/new',views.new_product,name='new_product'),
  path('product/images/<int:id>',views.new_product_images,name='product_images'),
  path('product/edit/<int:id>',views.edit_product,name='edit_product'),
  path('search/engine',views.search_engine,name='search_engine'),
  path('search/page',views.search_engine_page,name='search_engine_page'),
  path('product/details/slider/<int:id>',views.product_details_slider,name='product_details_slider'),
  path('sitemap.xml',views.sitemap,name='sitemap'),
  path('robots.txt',views.robots_txt,name='robots_txt'),
  path('product/delete/<int:id>',views.product_delete,name='product_delete'),
]