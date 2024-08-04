from django.urls import path
from .views import clean_text

urlpatterns = [
    path('', clean_text, name='clean-text'),
]
