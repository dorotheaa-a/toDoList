
# Create your views here.
from rest_framework import generics, viewsets
from .models import Note, NoteCollaborator
from .serializers import NoteSerializer
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response

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
        serializer.save(owner=self.request.user)

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

class NoteCollaboratorView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        note_id = request.data.get('note_id')
        user_id = request.data.get('user_id')
        permission_level = request.data.get('permission_level', 'view')

        note = get_object_or_404(Note, id=note_id, owner=request.user)
        collaborator = NoteCollaborator.objects.create(
            note=note,
            user_id=user_id,
            permission_level=permission_level
        )
        return Response({'message': 'Collaborator added'}, status=status.HTTP_201_CREATED)

    def put(self, request):
        note_id = request.data.get('note_id')
        user_id = request.data.get('user_id')
        permission_level = request.data.get('permission_level', 'view')

        collab = get_object_or_404(NoteCollaborator, note__id=note_id, user_id=user_id, note__owner=request.user)
        collab.permission_level = permission_level
        collab.save()
        return Response({'message': 'Collaborator updated'}, status=status.HTTP_200_OK)

    def delete(self, request):
        note_id = request.data.get('note_id')
        user_id = request.data.get('user_id')

        collab = get_object_or_404(NoteCollaborator, note__id=note_id, user_id=user_id, note__owner=request.user)
        collab.delete()
        return Response({'message': 'Collaborator removed'}, status=status.HTTP_204_NO_CONTENT)