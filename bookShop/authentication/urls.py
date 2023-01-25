from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static

from . import views

urlpatterns = [
    re_path(r'^auth/' , include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
