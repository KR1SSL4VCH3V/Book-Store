from django.contrib import admin

from my_library.accounts.models import AccountUser, UserProfilePicture


@admin.register(AccountUser)
class AdminUser(admin.ModelAdmin):
    pass

@admin.register(UserProfilePicture)
class AdminUserProfilePicture(admin.ModelAdmin):
    pass
