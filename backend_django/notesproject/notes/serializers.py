from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import Note, NoteCollaborator
from authUser.serializers import UserSerializer

User = get_user_model()

#convert queryset & complex data into native python 
# data type & easily render into json and etc. 
class NoteCollaboratorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = NoteCollaborator
        fields = ['user', 'permission_level', 'shared_at']
        read_only_fields = ['shared_at']

class NoteSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    collaborators = NoteCollaboratorSerializer(
        source='collaboration_set',
        many=True,
        read_only=True
    )
    
    # for write access
    shared_with = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        write_only=True,
        required=False
    )


    class Meta:
        model = Note
        fields = [
            'id',
            'title',
            'content',
            'project',
            'owner',
            'shared_with',
            'collaborators',
            'created_at',
            'updated_at'
        ]
        read_only_fields = (
            'id',
            'owner', 
            'created_at', 
            'updated_at',
            'collaborators'
        )
        extra_kwargs = {
            'project': {'write_only': True},
            'search_vector': {'write_only': True}
        }
    
    def create(self, validated_data):
        # handles shared_with separately
        shared_with_users = validated_data.pop('shared_with', [])

        # set curr user as owner
        note = Note.objects.create(
            owner=self.context['request'].user,
            **validated_data
        )

        if shared_with_users:
            for user in shared_with_users:
                NoteCollaborator.objects.create(
                    note=note,
                    user=user,
                    permission_level='view' #default
                )
        
        return note
    
    def update(self, instance, validated_data):
        # handle shared_with updates
        if 'shared_with' in validated_data:
            shared_with_users = validated_data.pop('shared_with')

            # clear collab not in new list
            existing_collaborators = instance.collaborators.exclude(
                user__in=shared_with_users
            )
            existing_collaborators.delete()

            # add new collaborators
            existing_user_ids = instance.collaborators.values_list('user_id', flat=True)

            for user in shared_with_users:
                if user.id not in existing_user_ids:
                    NoteCollaborator.objects.create(
                        note=instance,
                        user=user,
                        permission_level='view'
                    )
       
        return super().update(instance, validated_data)