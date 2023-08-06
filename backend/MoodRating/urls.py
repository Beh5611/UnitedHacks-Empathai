
from django.urls import path

from MoodRating.views import CreateRatingView, RatingsView

urlpatterns = [
    path('all/', RatingsView.as_view()),
    path('create/', CreateRatingView.as_view())
]
