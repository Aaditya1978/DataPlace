from rest_framework import serializers
from .models import CorpUser

class CorpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorpUser
        fields = ['id', 'name', 'website', 'email', 'address', 'city', 'state', 'pincode', 'password', 'verification_doc']