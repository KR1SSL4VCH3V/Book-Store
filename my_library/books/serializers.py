from abc import ABC

from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers

from my_library.books.models import Book, AddBook


class BookSerializer(serializers.ModelSerializer):
    rating = serializers.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ]
    )

    read = serializers.BooleanField(
        default=False,
    )

    def create(self, validated_data):
        book = Book.objects.create(
            title=validated_data['title'],
            author=validated_data['author'],
            rating=validated_data['rating'],
            read=validated_data['read'],
        )
        print("I am created")
        return book

    class Meta:
        model = Book
        fields = '__all__'


class AddBookSerializer(serializers.ModelSerializer):
    model = AddBook

    def create(self, validated_data):
        book = Book.objects.create(
            title=validated_data['title'],
            author=validated_data['author'],
        )
        print("I am created")
        return book

    class Meta:
        model = AddBook
        fields = "__all__"
