from django.conf import settings
from django.db import models

class MoodRating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True, auto_created=True)

    class Meta:
        unique_together = ('user', 'date')
