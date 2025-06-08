from django.db import models
from django.conf import settings
import uuid
# from notes.models import Note

# Create your models here.

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='owned_projects'
    )

    collaborators = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='collaborating_projects',
        through='ProjectCollaborator'
    )

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text="Determines project urgency level"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-last_updated_at']
        indexes = [
            models.Index(fields=['owner']),
            models.Index(fields=['priority']),
        ]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return f"{self.title} (Owner: {self.owner.username})"

    def get_all_notes(self):
        # return all note in projefsd
        return self.notes.all()
    
class ProjectCollaborator(models.Model):
    # intermediary model for Project collaborations
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='project_collaborations'
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='collaboration_set'
    )
    can_edit = models.BooleanField(default=False)
    shared_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'project')
        indexes = [
            models.Index(fields=['user', 'project']),
        ]
        verbose_name = "Project Collaborator"
        verbose_name_plural = "Project Collaborators"

    def __str__(self):
        return f"{self.user.username} -> {self.project.title} (Editable: {self.can_edit})"