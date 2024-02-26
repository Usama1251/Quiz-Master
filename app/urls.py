from django.urls import path
from .views import *

urlpatterns = [
    path('', Home.as_view(), name="home"),
    path('a_quiz/', Quiz.as_view(), name="a_quiz"),
    
]
