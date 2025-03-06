from django.db import models

# Create your models here.
class DistanceSearch(models.Model):
    source = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    formatted_source = models.CharField(max_length=255, blank=True, null=True)
    formatted_destination = models.CharField(max_length=255, blank=True, null=True)
    source_lat = models.FloatField()
    source_lng = models.FloatField()
    dest_lat = models.FloatField()
    dest_lng = models.FloatField()
    distance_km = models.FloatField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('source', 'destination')  # avoid duplicate entries

    def __str__(self):
        return f"{self.source} to {self.destination} - {self.distance_km} km"
