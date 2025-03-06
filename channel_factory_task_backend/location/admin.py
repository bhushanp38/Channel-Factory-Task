from django.contrib import admin
from .models import DistanceSearch

# Register your models here.
@admin.register(DistanceSearch)
class DistanceSearchAdmin(admin.ModelAdmin):
    list_display = ('source', 'destination', 'formatted_source', 'formatted_destination', 'distance_km', 'created_at')
    search_fields = ('source', 'destination', 'formatted_source', 'formatted_destination')
    list_filter = ('created_at',)