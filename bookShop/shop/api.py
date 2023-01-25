from django.db.models.functions import Coalesce

from .models import Carousel, Delivery, Genre
from .models import Book
from rest_framework import viewsets, permissions
from .serializers import BookSerializer, DeliverySerializer, GenreSerializer
from .serializers import CarouselSerializer


class BookViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BookSerializer
    def get_queryset(self, **kwargs):
        return Book.objects.all().order_by(Coalesce('id',None).desc())



class CarouselViewSet(viewsets.ModelViewSet):
    queryset = Carousel.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CarouselSerializer


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GenreSerializer

class DeliveryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DeliverySerializer
    def get_queryset(self):
        return Delivery.objects.all().order_by(Coalesce('Order_date',None).desc()).filter(user_id=self.kwargs.get('user_id'))