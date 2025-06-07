
# Create your views here.
from rest_framework import generics, viewsets
from .models import Note
from .serializers import NoteSerializer
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['title', 'content']

    def get_queryset(self):
        # return notes use own/shared with
        user = self.request.user
        return Note.objects.filter(
            Q(owner=user) |
            Q(collaborators__user=user)
        ).distinct().select_related('owner', 'project').prefetch_related('collaborators')

    def perform_create(self, serializer):
        # auto set curr user as owner
        serializer.save(created_by=self.request.user)

class NoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # access notes user own/has access
        user = self.request.user
        return Note.objects.filter(
            Q(owner=user) | 
            Q(collaborators__user=user)
        ).distinct()
    
    def perform_update(self, serializer):
        # check only owner update specific field
        note = self.get_object()
        if serializer.validated_data.get('project') and note.owner != self.request.user:
            raise PermissionDenied("Only the owner can change the project")
        serializer.save()

    def perform_destroy(self, instance):
        # only owner delet
        if instance.owner != self.request.user:
            raise PermissionDenied("Only owner can delete this note")
        instance.delete()