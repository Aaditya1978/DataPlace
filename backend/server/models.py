from django.db import models
from gdstorage.storage import GoogleDriveStorage

# Define Google Drive Storage
gd_storage = GoogleDriveStorage()

# Create your models here.
class CorpUser(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    website = models.URLField(max_length=100)
    email = models.EmailField(max_length=100)
    contact = models.CharField(max_length=100, default='')
    address = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    verification_doc = models.FileField(upload_to='corp', storage=gd_storage, default='')
    verified = models.BooleanField(default=False)
    verification_status = models.CharField(max_length=100, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id

class ColUser(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    website = models.URLField(max_length=100)
    email = models.EmailField(max_length=100)
    contact = models.CharField(max_length=20 , default='')
    address = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    verification_doc = models.FileField(upload_to='coll' , storage=gd_storage , default='')
    verified = models.BooleanField(default=False)
    verification_status = models.CharField(max_length=100, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id


class GovUser(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    contact = models.CharField(max_length=20 , default='')
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id
