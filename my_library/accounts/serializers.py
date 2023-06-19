from rest_framework import serializers
from django.core.validators import validate_email, RegexValidator
from django.contrib.auth import password_validation
from rest_framework.validators import UniqueValidator

from .models import AccountUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = '__all__'


class SignUpSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(
            queryset=AccountUser.objects.all(),
        )]
    )
    first_name = serializers.CharField(required=True)

    last_name = serializers.CharField(required=True)

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[password_validation.MinimumLengthValidator],
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = AccountUser
        fields = '__all__'


    def get_username_validator(self):
        username = serializers.CharField(validators=[
            RegexValidator(
                regex='^[a-zA-Z0-9_]*$',
                message='Username can only contain alphanumeric characters and underscores',
                code='invalid_username'
            )
        ])

        return username

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("The two passwords didn't match")
        return data

    def validate_email(self, value):
        validate_email(value)

        return value

    def create(self, validated_data):
        user = AccountUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user


class SignInSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = ('username', 'password')


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = '__all__'

#
# class UserPictureSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfilePicture
#         fields = '__all__'
#
