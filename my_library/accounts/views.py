from django.contrib.auth import authenticate
from rest_framework import generics as rest_views, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from my_library.accounts.models import AccountUser
from my_library.accounts.serializers import UserSerializer, SignInSerializer, SignUpSerializer, UpdateSerializer


class AccountListView(rest_views.ListAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = UserSerializer


class SignUpView(rest_views.CreateAPIView):
    serializer_class = SignUpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(rest_views.GenericAPIView):
    serializer_class = SignInSerializer

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateAccountView(rest_views.UpdateAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = UpdateSerializer
    lookup_field = 'id'


class DeleteAccountView(rest_views.DestroyAPIView):
    queryset = AccountUser.objects.all()
    lookup_field = 'id'


# class ProfilePictureView(rest_views.UpdateAPIView):
#     queryset = UserProfilePicture.objects.all()
#     serializer_class = UserPictureSerializer
#     parser_classes = (MultiPartParser, FormParser)
#
#     def perform_update(self, serializer):
#         serializer.save(profile_picture=self.request.data.get('profile_picture'))
#

# def get_user_picture(request, user_id):
#     static_url = settings.STATIC_URL
#
#     try:
#         user_profile = UserProfilePicture.objects.get(user_id=user_id)
#         picture_url = request.build_absolute_uri(user_profile.profile_picture.url)
#         return Response({'picture url': picture_url})
#
#     except UserProfilePicture.DoesNotExist:
#         return Response({'error': 'User profile picture does not exist'})
#

