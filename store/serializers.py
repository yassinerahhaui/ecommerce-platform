from rest_framework import serializers
from .models import Product,ReviewsResultInfo


class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = '__all__'

class ProductReviews(serializers.ModelSerializer):
  class Meta:
    model = ReviewsResultInfo
    fields = '__all__'