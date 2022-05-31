from django.contrib import admin
from .models import CorpUser
from .models import ColUser

class CorpUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'website', 'email', 'address', 'city', 'state', 'pincode', 'verification_doc', 'verified', 'verification_status', 'created_at')

class ColUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'website', 'email', 'address', 'city', 'state', 'pincode', 'verification_doc', 'verified', 'verification_status', 'created_at')


# Register your models here.

admin.site.register(CorpUser, CorpUserAdmin)