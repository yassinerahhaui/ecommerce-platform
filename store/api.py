from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from .serializers import ProductSerializer,ProductReviews
from rest_framework.decorators import api_view
from .models import Product,ReviewsResultInfo
from django.contrib.auth.models import User

# @api_view(['GET','POST'])
# def product_favorite(request,id):
#   product = Product.objects.get(pk=id)
#   user = User.objects.get(pk=request.user)
#   if request.method == 'POST':
#     pn = request.POST.data
#     print(pn)
#     return Response({'pn':pn})




class ProducrListAPI(ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  pagination_class = PageNumberPagination

  # def list(self,request):
  #   queryset = self.get_queryset()
  #   serializer = ProductSerializer(queryset,many=True)
  #   return Response(serializer.data)


class ProductDetails(APIView):
  def get_object(request,pk):
    try:
      return Product.objects.get(pk=pk)
    except Product.DoesNotExist:
      raise Http404
  
  def get(self,request,pk,format=None):
    obj = self.get_object(pk)
    serializer = ProductSerializer(obj)
    return Response(serializer.data)



class ProductReviewsInfo(APIView):
  def get_object(request,pk):
    try:
      return ReviewsResultInfo.objects.get(product=pk)
    except Product.DoesNotExist:
      raise Http404
  def get(self,request,pk,format=None):
    obj = self.get_object(pk)
    serializer = ProductReviews(obj)
    return Response(serializer.data)
  
 
class ProductDetailsSlider(APIView):
  def get_object(request,pk):
    try:
      return Product.objects.filter(category_parent=pk)
    except Product.DoesNotExist:
      raise Http404
  def get(self,request,pk,format=None):
    obj = self.get_object(pk)
    serializer = ProductSerializer(obj,many=True)
    return Response(serializer.data)
    
