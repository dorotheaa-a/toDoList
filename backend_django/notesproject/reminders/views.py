from django.shortcuts import render
from rest_framework import generics
from .models import Reminder
from .serializers import ReminderSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ReminderListView(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user.pk)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user.pk)

class ReminderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]
    # lookup_field = '_id'

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user.pk)