from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.models import Score
from app.serializers import QuizSerializers
from django.shortcuts import redirect

# Create your views here.

class Home(APIView):
    def get(self, request):
        scores = Score.objects.all()
        return render(request, "home.html", {"scores":scores})
    def post(self, request):
        scores = Score.objects.all()
        return render(request, 'home.html', {"scores":scores})
    
class Quiz(APIView):
    def get(self, request):
        return render(request, "a_quiz.html")
    
    def post(self, request):
        score = request.data.get('score')
        name = request.data.get('name')
        roll_no = request.data.get('roll_no')
        quiz_score = Score.objects.create(score=score, name=name, roll_no=roll_no)
        # Optionally, you can return a success message or any other response
        return redirect("/")

