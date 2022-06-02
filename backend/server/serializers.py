from rest_framework import serializers
from .models import CorpUser, ColUser, GovUser

class CorpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorpUser
        fields = ['id', 'name', 'website', 'email', 'contact', 'address', 'district', 'state', 'pincode', 'password', 'verification_doc', 'verified', 'verification_status', 'created_at']

class ColUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColUser
        fields = ['id', 'name', 'website', 'email', 'contact', 'address', 'district', 'state', 'pincode', 'password', 'verification_doc', 'verified', 'verification_status', 'created_at']


class GovUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovUser
        fields = ['id', 'name', 'email', 'contact', 'password', 'created_at']