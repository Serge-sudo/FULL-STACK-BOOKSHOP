from .models import User
from djoser.conf import settings
from rest_framework import serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            'bucket',
            'img',
            'address'
        )
        read_only_fields = (settings.LOGIN_FIELD,)