# Generated by Django 4.2 on 2023-05-04 22:16

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('rating', models.IntegerField(default=0, validators=[django.core.validators.MaxLengthValidator(10), django.core.validators.MinLengthValidator(0)])),
                ('summary', models.TextField()),
            ],
        ),
    ]