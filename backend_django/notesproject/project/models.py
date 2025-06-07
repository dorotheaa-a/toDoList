from django.db import models
from django.conf import settings
import uuid
# from notes.models import Note

# Create your models here.

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    # notes = models.ArrayField(
    #     model_container=Note
    # )
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
        verbose_name = "Project Collaborator"