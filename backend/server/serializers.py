from rest_framework import serializers
from .models import CorpUser
from .models import ColUser

class CorpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorpUser
        fields = ['id', 'name', 'website', 'email', 'contact', 'address', 'city', 'state', 'pincode', 'password', 'verification_doc']

class ColUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColUser
        fields = ['id', 'name', 'website', 'email', 'contact', 'address', 'city', 'state', 'pincode', 'password', 'verification_doc']