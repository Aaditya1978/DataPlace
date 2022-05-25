from django.contrib import admin
from .models import CorpUser

class CorpUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'website', 'email', 'address', 'city', 'state', 'pincode', 'verification_doc')


# Register your models here.

admin.site.register(CorpUser, CorpUserAdmin)