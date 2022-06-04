from django.contrib import admin
from .models import CorpUser, ColUser, GovUser

class CorpUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'website', 'email', 'address', 'district', 'state', 'pincode', 'verification_doc', 'verified', 'verification_status', 'created_at')

class ColUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'website', 'email', 'address', 'district', 'state', 'pincode', 'verification_doc', 'verified', 'verification_status', 'created_at')


class GovUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'contact', 'created_at')


# Register your models here.

admin.site.register(CorpUser, CorpUserAdmin)
admin.site.register(ColUser, ColUserAdmin)
admin.site.register(GovUser, GovUserAdmin)