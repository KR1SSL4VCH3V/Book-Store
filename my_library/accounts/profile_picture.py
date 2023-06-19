from django.contrib.auth.models import User

user = User.objects.all(id=1)
user.profile_picture.all()
