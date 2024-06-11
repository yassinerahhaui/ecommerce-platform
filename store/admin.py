from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
  pass

@admin.register(models.ProductSize)
class ProductAdmin(admin.ModelAdmin):
  pass

@admin.register(models.ProductColor)
class ProductAdmin(admin.ModelAdmin):
  pass

@admin.register(models.CategoryChild)
class CategoryChildAdmin(admin.ModelAdmin):
  pass

@admin.register(models.CategoryParent)
class CategoryParentAdmin(admin.ModelAdmin):
  pass

@admin.register(models.Collection)
class CollectionAdmin(admin.ModelAdmin):
  pass

@admin.register(models.ProductImage)
class CollectionAdmin(admin.ModelAdmin):
  pass

@admin.register(models.ProductRatting)
class CollectionAdmin(admin.ModelAdmin):
  pass

@admin.register(models.ReviewsResultInfo)
class CollectionAdmin(admin.ModelAdmin):
  pass