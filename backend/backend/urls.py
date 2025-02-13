from django.urls import path
from backend.api.views import test_view

urlpatterns = [
    path('test/', test_view),
]
