from django.urls import path

from my_library.books.views import BooksList, BookDetails, AddBook

urlpatterns = (
    path('books/', BooksList.as_view(), name='books'),
    path('books/add/', AddBook.as_view(), name='add'),
    path('books/<int:pk>/', BookDetails.as_view(), name='details'),
)
