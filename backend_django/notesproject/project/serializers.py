from rest_framework import serializers
from .models import Project, ProjectCollaborator
from authUser.models import CustomUser
from notes.serializers import NoteSerializer

class ProjectSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(source='owner.email', read_only=True)
    priority = serializers.CharField(source='get_priority_display', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'owner_email', 'owner_email', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner_email', 'created_at', 'updated_at']

class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['title', 'priority']  # for create/update purposes


class ProjectDetailSerializer(ProjectSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    collaborators = serializers.SerializerMethodField()

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['notes', 'collaborators']

    def get_collaborators(self, obj):
        return [
            {
                'email': c.user.email,
                'username': c.user.username,
                'can_edit': c.can_edit,
                'shared_at': c.shared_at
            }
            for c in obj.collaborators.all()
        ]

class ProjectCollaboratorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username')

    class Meta:
        model = ProjectCollaborator
        fields = ['email', 'username', 'can_edit', 'shared_at']
        read_only_fields = ['email', 'username', 'shared_at']

