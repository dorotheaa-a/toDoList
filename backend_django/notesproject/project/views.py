from django.shortcuts import render
from django.db import models
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Project, ProjectCollaborator
from .serializers import (
    ProjectSerializer, 
    ProjectDetailSerializer,
    ProjectCollaboratorSerializer,
    ProjectCreateUpdateSerializer
)
from authUser.models import CustomUser
from notes.serializers import NoteSerializer

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ProjectCreateUpdateSerializer
        return ProjectSerializer

    def get_queryset(self):
        # gets project where user owns/collab
        user = self.request.user
        return Project.objects.filter(
            models.Q(owner=user) |
            models.Q(collaborators=user)
        ).distinct().prefetch_related(
            'notes',
            'collaboration_set__user'
        )
    
    def perform_create(self, serializer):
        # owner into current user aftr create
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get'])
    def notes(self, request, pk=None):
        # grab all note in proj
        project = self.get_object()
        notes = project.notes.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post', 'delete'])
    def collaborators(self, request, pk=None):
        # add & rm ppl
        project = self.get_object()

        if request.method == 'POST':
            return self._add_collaborator(project, request)
        return self._remove_collaborator(project, request)
        
    def _add_collaborator(self, project, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # cant add owner again
        if project.owner == user:
            return Response(
                {"error": "User is project owner"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        collaborator, created = ProjectCollaborator.objects.get_or_create(
            project=project, 
            user=user, 
            defaults={'can_edit': request.data.get('can_edit', False)}
        )

        if not created:
            return Response(
                {"error": "User is already collaborator"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = ProjectCollaboratorSerializer(collaborator)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def _remove_collaborator(self, project, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = CustomUser.objects.get(email=email)
            collaborator = ProjectCollaborator.objects.get(
                project=project,
                user=user
            )
            collaborator.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (CustomUser.DoesNotExist, ProjectCollaborator.DoesNotExist):
            return Response(
                {"error": "Collaboration relationship not found"},
                status=status.HTTP_404_NOT_FOUND
            )