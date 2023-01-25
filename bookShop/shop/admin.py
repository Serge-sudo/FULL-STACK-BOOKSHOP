from django.contrib import admin
from .models import Book, Delivery, Genre
from .models import Carousel
# Register your models here.

class CarouselAdmin(admin.ModelAdmin):
    pass

admin.site.register(Carousel, CarouselAdmin)

class BookAdmin(admin.ModelAdmin):
    pass

admin.site.register(Book, BookAdmin)

class GenreAdmin(admin.ModelAdmin):
    pass

admin.site.register(Genre, GenreAdmin)

class DeliveryAdmin(admin.ModelAdmin):
    pass

admin.site.register(Delivery, DeliveryAdmin)