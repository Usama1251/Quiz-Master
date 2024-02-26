from django.db import models

class Score(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    roll_no = models.CharField(max_length=100, blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)
