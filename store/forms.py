from django import forms
from .models import Product, ProductImage

class ProductForm(forms.ModelForm):
  class Meta:
    model = Product
    fields = ['name_ar','name_en','name_fr','description_ar','description_en','description_fr','price','old_price','quantity','cache_en_delevery','image','size_guide_image','colors','sizes','category_parent']


class ProductImagesForm(forms.ModelForm):
  class Meta:
    model = ProductImage
    fields = '__all__'
    exclude = ['product']

