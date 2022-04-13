from .views import TestView
from django.urls import path

urlpatterns = [
    path('', TestView.as_view(), name='some'),
]
