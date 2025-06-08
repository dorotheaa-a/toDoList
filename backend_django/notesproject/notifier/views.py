from django.shortcuts import render
from rest_framework import generics
from .models import Notifier
from .serializers import NotifierSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class NotifierCreateView(generics.CreateAPIView):
    queryset = Notifier.objects.all()
    serializer_class = NotifierSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)