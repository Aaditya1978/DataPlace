# Generated by Django 4.0.4 on 2022-05-29 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0006_coluser_created_at_coluser_verified_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='coluser',
            name='verification_status',
            field=models.CharField(default='Pending', max_length=100),
        ),
        migrations.AddField(
            model_name='corpuser',
            name='verification_status',
            field=models.CharField(default='Pending', max_length=100),
        ),
    ]
