from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('register', views.index),
    path('contacts', views.index),
    path('bucket', views.index),
    path('aboutus', views.index),
    path('profile', views.index),
    path('bestsellers', views.index),
    path('settings', views.index),
    path('category/<str:category>/', views.index),
    path('search/<str:q>/', views.index),
    path('books/<int:pk>/', views.index),
]
