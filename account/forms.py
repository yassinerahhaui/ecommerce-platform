from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import ProfileUser



class SignUpForm(UserCreationForm):
  def clean_email(self):
    email = self.cleaned_data['email']
    if not email:
      return forms.ValidationError("Email is required!")
    else:
      if User.objects.filter(email=email).exists():
          raise forms.ValidationError("Email already exists!")
      return email
  class Meta:
    model = User
    fields = ['username','email','password1','password2']

class UserForm(forms.ModelForm):
  class Meta:
    model = User
    fields = ['username','first_name','last_name','email']

class ProfileForm(forms.ModelForm):
  class Meta:
    model = ProfileUser
    exclude = ['user','seler_rank']