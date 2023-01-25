from django.db import models

from authentication.models import User


# Create your models here.


class Genre(models.Model):
    genre = models.CharField(max_length=100, primary_key=True)
    def __str__(self):
        return self.genre

class Book(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField(blank=True)
    imgSrc = models.ImageField(upload_to='images/books/')
    price = models.FloatField()
    data = models.DateTimeField(auto_now_add=True)
    genre = models.ManyToManyField(Genre)
    rating = models.FloatField(default=0)
    isBestSeller = models.BooleanField(default=False)
    def __str__(self):
        return self.name


class Carousel(models.Model):
    img = models.ImageField(upload_to='images/carousel')
    title = models.CharField(max_length=1000)
    subtitle = models.TextField(blank=True)
    href = models.CharField(max_length=1000, blank=True)
    def __str__(self):
        return self.title


class Delivery(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    Order_date = models.DateField(auto_now_add=True)
    cost = models.FloatField()
    address = models.CharField(max_length=100,default='')
    def __str__(self):
        return str(self.user_id) + "->" + str(self.book_id)


