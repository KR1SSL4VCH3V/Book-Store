from django.urls import path

from my_library.accounts.views import AccountListView, SignInView, SignUpView, UpdateAccountView, DeleteAccountView


urlpatterns = (
    path('accounts/', AccountListView.as_view(), name='user'),
    path('signin/', SignInView.as_view(), name='signIn'),
    path('signup/', SignUpView.as_view(), name='signUp'),
    path('<int:id>/update/', UpdateAccountView.as_view(), name='update'),
    path('<int:id>/delete/', DeleteAccountView.as_view(), name='delete'),

)
