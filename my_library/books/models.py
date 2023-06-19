from django.contrib.auth.models import User
from django.db import models


class Book(models.Model):

    title = models.CharField(
        max_length=100,
        default=True,
        null=False,
        blank=False,
    )

    author = models.CharField(
        max_length=100,
        default=True,
        null=False,
        blank=False,
        )

    rating = models.IntegerField(
        default=0,
        null=False,
        blank=False,
    )

    read = models.BooleanField(
        default=False,
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.title


class AddBook(models.Model):
    title = models.CharField(
        default=""
    )

    author = models.CharField(
        default=""
    )

    def __str__(self):
        return f"{self.title} By:{self.author}"
