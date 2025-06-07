from django.db import models
from django.conf import settings
from django.contrib.postgres.indexes import GinIndex  # PostgreSQL-specific index
from django.contrib.postgres.search import SearchVectorField, SearchVector 
# from project.models import Project
import uuid

# Create your models here.

class Note(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    
    # textfield w/ no max_len for Postgres
    content = models.TextField(blank=True, default="")
    
    # use bigautofield 
    project = models.ForeignKey(
        'project.Project',
        on_delete=models.CASCADE,
        related_name='notes',
        null=True,
        blank=True,
        db_column='project_id'
    )

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, #ref from settings
        on_delete=models.CASCADE,
        related_name='owned_notes',
        db_column='owner_id'
    )

    shared_with = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='collaborating_notes',
        through='NoteCollaborator',
        through_fields=('note', 'user')
    )

    # postgres specific field
    search_vector = SearchVectorField(null=True, blank=True)

    # for timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']
        indexes = [
            # gin index for faster text search
            GinIndex(fields=['search_vector']),

            # index for freq query field
            models.Index(fields=['project']),
            models.Index(fields=['owner']),
            models.Index(fields=['updated_at']),
        ]
        verbose_name = "Note"
        verbose_name_plural = "Notes"
        
    def __str__(self):
        return f"{self.title} (Project: {self.project.title})"
    
    def save(self, *args, **kwargs):
        # custom save to update search vector
        super().save(*args, **kwargs)
        if 'updated_fields' not in kwargs or 'content' in kwargs['updated_fields']:
            from django.contrib.postgres.search import SearchVector
            Note.objects.filter(pk=self.pk).update(
                search_vector=SearchVector('title', 'content')
            )

class NoteCollaborator(models.Model):
    # intermediary for note collab
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='note_collaborations',
        db_column='user_id'
    )
    note = models.ForeignKey(
        Note,
        on_delete=models.CASCADE,
        related_name='collaboration_set',
        db_column='note_id'
    )
    can_edit = models.BooleanField(default=False)
    shared_at = models.DateTimeField(auto_now_add=True)


    # collab-specific field
    permission_level = models.CharField(
        max_length=20,
        choices=[
            ('view', 'Can View'),
            ('comment', 'Can Comment'),
            ('edit', 'Can Edit')
        ],
        default='view'
    )

    class Meta:
        unique_together = ('user', 'note')
        verbose_name = "Note Collaborator"
        verbose_name_plural = "Note Collaborators"
        indexes = [
            models.Index(fields=['user', 'note']),
        ]

    def __str__(self):
        return f"{self.user.username} -> {self.note.title} ({self.permission_level})"