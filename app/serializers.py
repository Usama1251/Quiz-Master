from rest_framework import serializers
from app.models import Score

class QuizSerializers(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ['name', 'roll_no', 'score']
