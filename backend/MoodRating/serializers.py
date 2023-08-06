from rest_framework import serializers
from MoodRating.models import MoodRating


class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodRating
        fields = ['id', 'user', 'score', 'date']
