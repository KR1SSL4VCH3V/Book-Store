from django.contrib import admin

from my_library.books.models import Book, AddBook


@admin.register(Book)
class AdminBook(admin.ModelAdmin):
    pass


@admin.register(AddBook)
class AdminAddBook(admin.ModelAdmin):
    pass
