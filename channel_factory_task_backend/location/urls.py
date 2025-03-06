from django.urls import path
from .views import get_geocode, get_distance

urlpatterns = [
    path('geocode/', get_geocode, name='geocode'),
    path('calculate_dist/', get_geocode, name='calculate_dist'),
    path('distance/', get_distance, name='distance'),
]
