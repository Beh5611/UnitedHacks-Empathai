from django.http import QueryDict
from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response

from rest_framework import status, permissions, authentication
from MoodRating.models import MoodRating
from MoodRating.serializers import MoodSerializer


# Create your views here.

class RatingsView(ListAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MoodSerializer

    def get_queryset(self):
        return MoodRating.objects.filter(user=self.request.user.id)


class CreateRatingView(CreateAPIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MoodSerializer

    def create(self, request, *args, **kwargs):
        data = QueryDict('', mutable=True)
        data['user'] = self.request.user.id
        print('userid', self.request.user.id)
        data.update(request.data)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED,
                        headers=headers)
