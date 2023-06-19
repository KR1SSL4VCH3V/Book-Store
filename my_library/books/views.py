from rest_framework import generics as rest_view, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response

from my_library.books.models import Book
from my_library.books.serializers import BookSerializer, AddBookSerializer


class BooksList(rest_view.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        read_books = self.request.query_params.get('read', None)

        if read_books is not None:
            read_books = read_books.lower() == 'true'
            queryset = queryset.filter(read=read_books)

        return queryset


class AddBook(rest_view.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = AddBookSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            print('I am in')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Error", serializer.errors)
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class BookDetails(rest_view.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        book = Book.objects.get(*args, **kwargs)
        book.delete()

        return Response({'message': 'Successfully deleted'})
