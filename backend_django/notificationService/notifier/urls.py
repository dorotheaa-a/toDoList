from django.urls import path
from notifier.views import NotifierCreateView

urlpatterns = [
    path('notify/', NotifierCreateView.as_view(), name='create-notifier'),
]
