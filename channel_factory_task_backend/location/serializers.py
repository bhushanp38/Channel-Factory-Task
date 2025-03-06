from rest_framework import serializers
from .models import DistanceSearch

class DistanceSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistanceSearch
        fields = '__all__'  