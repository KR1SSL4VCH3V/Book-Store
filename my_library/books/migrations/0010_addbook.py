# Generated by Django 4.2 on 2023-06-16 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0009_alter_book_author_alter_book_rating_alter_book_read_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AddBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='')),
                ('author', models.CharField(default='')),
            ],
        ),
    ]