from rest_framework import routers
from .api import BookViewSet, DeliveryViewSet, GenreViewSet
from .api import CarouselViewSet

router = routers.DefaultRouter()
router.register('api/book',BookViewSet,'book')
router.register('api/carousel',CarouselViewSet,'carousel')
router.register('api/delivery/(?P<user_id>\d+)',DeliveryViewSet,'delivery')
router.register('api/genres',GenreViewSet,'genres')

urlpatterns = router.urls

# (?P<start>\d+)-(?P<end>\d+)