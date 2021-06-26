from .views import ListUsers
from django.urls import path, include

urlpatterns = [
    path('', ListUsers.as_view(), name='some'),
]
