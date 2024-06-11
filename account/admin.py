from django.contrib import admin
from .models import ProfileUser, Wallet, Transaction
# Register your models here.

@admin.register(ProfileUser)
class ProfileUserAdmin(admin.ModelAdmin):
  list_display = ('user','gender','age','brand','phone')

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
  list_display = ('user', 'money')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
  pass
