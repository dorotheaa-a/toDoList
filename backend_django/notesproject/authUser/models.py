# from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField
import uuid
from django.core.exceptions import ValidationError
# from .models import Note, Project

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))
        if not username:
            raise ValueError(_('Users must have a username'))

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(_('username'), max_length=150, unique=True)
    email = models.EmailField(_('email address'), unique=True)
      
    # # for collab
    shared_notes = models.ManyToManyField(
        'notes.Note', related_name='notes_shared', blank=True
    )
    shared_projects = models.ManyToManyField(
        'project.Project', related_name='project_shared', blank=True
    )

    # receive_notifications = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return f"{self.username} ({self.email})"
    
    def to_go_dict(self):
        """Serialization format for Go middleware"""
        return {
            "user_id": str(self.id),  # UUID as string
            "email": self.email,
            "username": self.username,
            # Fetch the IDs from the ManyToMany relationship
            "shared_notes": list(self.shared_notes.values_list('id', flat=True)),
            "shared_projects": list(self.shared_projects.values_list('id', flat=True)),
            
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat()
    }

    def share_project(self, project_id, notes_in_project):
        # share project & notes with user
        if project_id not in self.shared_projects:
            self.shared_projects.append(project_id)
        # Get current shared notes to avoid duplicates
        current_shared = set(self.shared_notes.all().values_list('id', flat=True))
        
        # Find new notes to add
        notes_to_add = [note_id for note_id in notes_in_project 
                       if note_id not in current_shared]
        
        # Add new notes using proper M2M method
        if notes_to_add:
            from notes.models import Note
            notes = Note.objects.filter(id__in=notes_to_add)
            self.shared_notes.add(*notes)
        
        self.save()
    
    def unshare_project(self, project_id, notes_in_project):
        # rm sharing project & related notes
        from notes.models import Note
        if project_id in self.shared_projects:
            self.shared_projects.remove(project_id)
            
            # Find notes that are only in this project
            from notes.models import Note
            notes_only_in_this_project = [
                note_id for note_id in notes_in_project
                if not Note.objects.filter(
                    id=note_id,
                    project_id__in=self.shared_projects
                ).exists()
            ]
            
            # Remove those notes using proper M2M method
            if notes_only_in_this_project:
                notes = Note.objects.filter(id__in=notes_only_in_this_project)
                self.shared_notes.remove(*notes)
            
            self.save()


    def get_accessible_projects(self):
        # if get project access, can access all under it
        from project.models import Project
        return Project.objects.filter(
            models.Q(owner=self) |
            models.Q(collaborators__user=self)
        ).distinct()

    def get_accessible_notes(self):
        # find note yg udh given permission
        from notes.models import Note
        return Note.objects.filter(
            models.Q(owner=self) |
            models.Q(project__collaborators__user=self) |
            models.Q(shared_with__user=self)
        ).distinct()