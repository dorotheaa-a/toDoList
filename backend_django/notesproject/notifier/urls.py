from django.urls import path
from .views import NotifierCreateView

urlpatterns = [
    path('', NotifierCreateView.as_view(), name='create-notifier'),
]