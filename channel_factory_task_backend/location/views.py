from django.shortcuts import render
import requests
from rest_framework.decorators import api_view
from math import radians, sin, cos, sqrt, atan2
import json
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DistanceSearch
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def get_geocode(address):
    """fetch latitude and longitude using OpenStreetMap Nominatim API"""
    url = f"https://nominatim.openstreetmap.org/search?q={requests.utils.quote(address)}&format=json"
    
    headers = {"User-Agent": "ChannelFactory API - 1.0"}  # Required by Nominatim
    print(url)
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        return None, None, None  # API request failed

    data = response.json()
    
    if data:
        location = data[0]
        return location.get("display_name"), float(location["lat"]), float(location["lon"])

    return None, None, None  # No results found

def calculate_distance(lat1, lon1, lat2, lon2):
    """calculate the Haversine distance between two coordinates"""
    R = 6371  # km - radius of earth
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c  # distance in km

@csrf_exempt
def get_distance(request):
    """fetch distance between two places """
    try:
        data = json.loads(request.body)
        source = data.get('source')
        destination = data.get('destination')
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)

    if not source or not destination:
        return JsonResponse({"error": "Source and destination are required"}, status=400)

    # fetch geocodes using OpenStreetMap
    formatted_source, src_lat, src_lng = get_geocode(source)
    formatted_destination, dest_lat, dest_lng = get_geocode(destination)

    if src_lat is None or dest_lat is None:
        return JsonResponse({"error": "Invalid address, could not retrieve coordinates"}, status=400)

    # check if the entry already exist before calling the api
    distance_entry = DistanceSearch.objects.filter(source=source, destination=destination).first()
    if distance_entry:
        return JsonResponse({
            "source": distance_entry.source,
            "destination": distance_entry.destination,
            "formatted_source": distance_entry.formatted_source,
            "formatted_destination": distance_entry.formatted_destination,
            "distance_km": round(distance_entry.distance_km, 2),
        })
    
    # calculate distance
    distance = calculate_distance(src_lat, src_lng, dest_lat, dest_lng)

    with transaction.atomic():
        DistanceSearch.objects.create(
            source=source,
            destination=destination,
            formatted_source=formatted_source,
            formatted_destination=formatted_destination,
            source_lat=src_lat,
            source_lng=src_lng,
            dest_lat=dest_lat,
            dest_lng=dest_lng,
            distance_km=distance,
        )

    return JsonResponse({
        "source": source,
        "destination": destination,
        "formatted_source": formatted_source,
        "formatted_destination": formatted_destination,
        "distance_km": round(distance, 2),
    })