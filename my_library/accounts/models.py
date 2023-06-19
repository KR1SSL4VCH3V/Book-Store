from django.contrib.auth.models import User
from django.db import models


class AccountUser(models.Model):
    username = models.CharField(
        max_length=50,
    )

    first_name = models.CharField(
        max_length=50,
        default='',
        null=False,
        blank=False,
    )

    last_name = models.CharField(
        max_length=50,
        default='',
        null=False,
        blank=False,
    )

    email = models.EmailField(
        max_length=50,
    )

    password = models.CharField(
        max_length=50,
    )

    def __str__(self):
        return f"{self.id}: {self.username}"


class UserProfilePicture(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='profile_pictures',

    )

    profile_picture = models.ImageField(
        upload_to='user_pictures',
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.user}"
