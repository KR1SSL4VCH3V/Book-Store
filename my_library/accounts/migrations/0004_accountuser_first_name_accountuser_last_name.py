# Generated by Django 4.2 on 2023-05-08 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_userprofilepicture'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountuser',
            name='first_name',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='accountuser',
            name='last_name',
            field=models.CharField(default='', max_length=50),
        ),
    ]
