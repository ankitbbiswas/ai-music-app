from django.urls import path
from .views import GenerateMusic

urlpatterns = [
    path('generate-music/', GenerateMusic.as_view(), name='generate-music'),
]