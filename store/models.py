from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from account.models import ProfileUser
import uuid

def imageupload(instance,filename):
  i = instance
  fn = filename.split('.')[0]
  ext = filename.split('.')[-1]
  return f'{i.user}/products/{uuid.uuid4()}-yrshop-{fn}.{ext}'

def imageupload2(instance,filename):
  product = instance.product
  user = User.objects.get(pk=instance.product.user.id)
  fn = filename.split('.')[0]
  ext = filename.split('.')[-1]
  return f'{user}/products/{uuid.uuid4()}-yrshop-{fn}.{ext}'

class Product(models.Model):
  user = models.ForeignKey(User,related_name='user_product',on_delete=models.CASCADE,null=True)
  name_ar = models.CharField(max_length=400,null=True,blank=True)
  name_en = models.CharField(max_length=400,null=True,blank=True)
  name_fr = models.CharField(max_length=400,null=True,blank=True)
  description_ar = models.TextField(max_length=5500,null=True,blank=True)
  description_en = models.TextField(max_length=5500,null=True,blank=True)
  description_fr = models.TextField(max_length=5500,null=True,blank=True)
  price = models.DecimalField(max_digits=10,decimal_places=2,null=True)
  score_like = models.IntegerField(default=0)
  score_stars = models.IntegerField(default=0)
  score_search = models.IntegerField(default=0)
  score = models.IntegerField(default=0)
  old_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
  sale = models.BooleanField(default=False)
  salePer = models.IntegerField(default=0)
  stock_out = models.BooleanField(default=False)
  quantity = models.PositiveIntegerField(default=1)
  image = models.ImageField(upload_to=imageupload,null=True,max_length=300)
  size_guide_image = models.ImageField(upload_to=imageupload,null=True,blank=True,max_length=300)
  colors = ArrayField(models.CharField(max_length=10,blank=True),size=20,null=True,blank=True)
  sizes = ArrayField(models.CharField(max_length=10,blank=True),size=20,null=True,blank=True)
  cache_en_delevery = models.BooleanField(default=True)
  category_child = models.ForeignKey('CategoryChild',related_name='product_category_child',on_delete=models.CASCADE,null=True,blank=True)
  category_parent = models.ForeignKey('CategoryParent',related_name='product_category_parent',on_delete=models.CASCADE,null=True)
  collection = models.ForeignKey('Collection',related_name='product_collection',on_delete=models.DO_NOTHING,null=True,blank=True)
  created_at = models.DateTimeField(auto_now=True,null=True)
  updated_at = models.DateTimeField(auto_now_add=True,null=True)
  reviews = models.FloatField(default=0) # reviews stars result
  allUserRate = models.FloatField(default=0) # all users rate this product
  like = models.ManyToManyField(User,related_name='user_like',blank=True)
  def save(self,*args,**kwargs):
    # if stock empty stock_out active and stop ( sale this product )
    if self.quantity < 1:
      self.quantity = 0
      self.stock_out = True
    else:
      self.stock_out = False
    
    # self.score_like = len(self.like.all()) * 2
    self.score = self.score_like + self.score_stars + self.score_search

    # active sale and deactive auto 
    if self.old_price:
      if self.old_price > self.price:
        self.sale = True
        devision = self.old_price / self.price
        percent = 100 / devision
        self.salePer = 100 - percent
      else:
        self.sale = False
    super().save(*args,**kwargs)

  def __str__(self):
    return self.name_en

class ProductSize(models.Model):
  product = models.ForeignKey(Product,related_name='product_size',on_delete=models.CASCADE,null=True)
  size = models.CharField(max_length=20)
  price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
  quantity = models.PositiveIntegerField(default=1)
  def __str__(self):
    return f'{self.product} >> {self.size}'

class ProductColor(models.Model):
  product = models.ForeignKey(Product,related_name='product_color',on_delete=models.CASCADE,null=True)
  size = models.ForeignKey(Product,related_name='product_size_color',on_delete=models.CASCADE,null=True,blank=True)
  color = models.CharField(max_length=20)
  price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
  quantity = models.PositiveIntegerField(default=1)
  def __str__(self):
    return f'{self.product} >> {self.size} >> {self.color} '


# product reviews info
class ReviewsResultInfo(models.Model):
  # product relationship field
  product = models.OneToOneField(Product,related_name='ProductReviewsResultInfo',on_delete=models.CASCADE,null=True)
  allUserRate = models.FloatField(default=0) # all users rate this product
  stars5 = models.FloatField(default=0) # total user 5 stars review
  stars4 = models.FloatField(default=0) # total user 4 stars review
  stars3 = models.FloatField(default=0) # total user 3 stars review
  stars2 = models.FloatField(default=0) # total user 2 stars review
  stars1 = models.FloatField(default=0) # total user 1 stars review
  starsPer5 = models.FloatField(default=0)
  starsPer4 = models.FloatField(default=0)
  starsPer3 = models.FloatField(default=0)
  starsPer2 = models.FloatField(default=0)
  starsPer1 = models.FloatField(default=0)
  allStars = models.FloatField(default=0) # all stars in product
  reviews = models.FloatField(default=0) # reviews stars result
  def __str__(self):
    return str(self.product)

class ProductRatting(models.Model):
  # product relationship field
  reviewInfo = models.ForeignKey(ReviewsResultInfo,related_name='product_ratting',on_delete=models.CASCADE,null=True)
  # user relationship field
  user = models.ForeignKey(User,related_name='user_ratting',on_delete=models.DO_NOTHING,null=True)
  profile = models.ForeignKey(ProfileUser,related_name='profile_ratting',on_delete=models.DO_NOTHING,null=True)
  # this field for (user rate product unique) #
  uniqueReview = models.CharField(max_length=1000000,unique=True,default='unique key')
  stars = models.FloatField(default=1)
  comment = models.TextField(max_length=1000,null=True,blank=True)
  seler_reponse = models.TextField(max_length=1000,null=True,blank=True)
  reviewDate = models.DateTimeField(auto_now=True)
  reviewUpdate = models.DateTimeField(auto_now_add=True,null=True)

  def save(self,*args,**kwargs): # check data before send to database and save
    self.uniqueReview = f'{str(self.reviewInfo)}_{str(self.user)}_{str(self.reviewInfo.pk)}_{str(self.user.pk)}'
    if self.stars > 5.00:
      self.stars = 5.00
    elif self.stars < 0:
      self.stars = 0
    super().save(*args, **kwargs)

  def __str__(self): # interface data field
    return str(self.uniqueReview)

@receiver(post_save, sender=ProductRatting)
def product_update_review(sender,instance,**kwargs):
  i = instance
  _stars = ProductRatting.objects.filter(reviewInfo=i.reviewInfo) # all user rate Product
  _5stars = _4stars = _3stars =_2stars = _1stars = all_stars = 0
  
  for star in _stars: # all stars in product
    all_stars += star.stars
    if star.stars == 5.0:
      _5stars += 1
    elif star.stars >= 4.0:
      _4stars += 1
    elif star.stars >= 3.0:
      _3stars += 1
    elif star.stars >= 2.0:
      _2stars += 1
    elif star.stars >= 1.0:
      _1stars += 1
  all_user_rate = float(len(_stars)) # all user rate product
  reviews = all_stars / all_user_rate # reviews result
  # reviews stars percent function #
    
    
  # send reviews info data to ReviewsResultInfo #
  product = ReviewsResultInfo.objects.get(pk=i.reviewInfo.pk)
  if _5stars == 0:
    _starsPer5 = 0  
  else:
    _starsPer5 = 100 / (all_user_rate/_5stars)
    
  if _4stars <= 0:
    _starsPer4 = 0
  else:
    _starsPer4 = 100 / (all_user_rate/_4stars)
    
  if _3stars <= 0:
    _starsPer3 = 0
  else:
    _starsPer3 = 100 / (all_user_rate/_3stars)
  
  if _2stars <=0:
    _starsPer2 = 0
  else:
    _starsPer2 = 100 / (all_user_rate/_2stars)

  if _1stars <= 0:
    _starsPer1 = 0
  else:
    _starsPer1 = 100 / (all_user_rate/_1stars)

  product.starsPer5 = _starsPer5
  product.starsPer4 = _starsPer4
  product.starsPer3 = _starsPer3
  product.starsPer2 = _starsPer2
  product.starsPer1 = _starsPer1
  product.stars5 = _5stars
  product.stars4 = _4stars
  product.stars3 = _3stars
  product.stars2 = _2stars
  product.stars1 = _1stars
  product.allUserRate = all_user_rate
  product.allStars = all_stars
  product.reviews = reviews
  product.save()

  pr = Product.objects.get(pk=product.product.pk)
  pr.allUserRate = all_user_rate
  pr.score_stars = all_stars * 5
  pr.score = (all_stars * 5) + pr.score_like
  pr.reviews = reviews
  pr.save()


class ProductImage(models.Model):
  product = models.ForeignKey(Product,related_name='product_images',on_delete=models.CASCADE)
  image1 = models.ImageField(upload_to=imageupload2,null=True,blank=True)
  image2 = models.ImageField(upload_to=imageupload2,null=True,blank=True)
  image3 = models.ImageField(upload_to=imageupload2,null=True,blank=True)
  image4 = models.ImageField(upload_to=imageupload2,null=True,blank=True)
  image5 = models.ImageField(upload_to=imageupload2,null=True,blank=True)
  def __str__(self):
    return str(self.product)
  


class CategoryChild(models.Model):
  name_en = models.CharField(max_length=50)
  name_fr = models.CharField(max_length=50)
  name_ar = models.CharField(max_length=50)
  # icon_dark = models.ImageField(upload_to='category/icons/child/dark',null=True)
  # icon_light = models.ImageField(upload_to='category/icons/child/light',null=True)
  category_parent = models.ForeignKey('CategoryParent',related_name='child_category_parent',on_delete=models.CASCADE,null=True)
  def __str__(self):
    return self.name_en

class CategoryParent(models.Model):
  name_en = models.CharField(max_length=25)
  name_fr = models.CharField(max_length=25)
  name_ar = models.CharField(max_length=25)
  icon_dark = models.ImageField(upload_to='category/icons/parent/dark',null=True)
  icon_light = models.ImageField(upload_to='category/icons/parent/light',null=True)
  def __str__(self):
    return self.name_en

class Collection(models.Model):
  user = models.ForeignKey(User,related_name='user_collection',on_delete=models.CASCADE,null=True)
  name = models.CharField(max_length=200)
  image = models.ImageField(upload_to='collection')
  price = models.DecimalField(max_digits=10,decimal_places=2,null=True)
  old_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
  def __str__(self):
    return self.name

@receiver(post_save,sender=Product)
def product_create_images(sender,instance,created,**kwargs):
  i = instance
  if created:
    ProductImage.objects.create(product=i)
    ReviewsResultInfo.objects.create(product=i)

