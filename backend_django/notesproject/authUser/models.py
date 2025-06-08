# from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField
import uuid
from project.models import Project
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

    def share_project_with_user(self, project: Project, notes=None):
        #  add the project to user's shared proj
        self.shared_projects.add(project)

        # all notes from project to user's shared notes
        notes_in_project = project.notes.all() # Assumes project has a related_name='notes' from Note model
        self.shared_notes.add(*notes_in_project)
        

    def unshare_project(self, project: Project):
        # rm sharing project & related notes
        self.shared_projects.remove(project)

        # find notes shud be rm
        notes_to_remove = []
        for note in project.notes.all():
            # Check if this note belongs to any *other* projects user has access
            is_in_another_shared_project = self.shared_projects.filter(notes=note).exists()
            if not is_in_another_shared_project:
                notes_to_remove.append(note)

        # rm notes
        if notes_to_remove:
            self.shared_notes.remove(*notes_to_remove)

    def get_accessible_projects(self):
        # if get project access, can access all under it
        from project.models import Project
        return Project.objects.filter(
            models.Q(owner=self) |
            models.Q(project_shared=self)
        ).distinct()

    def get_accessible_notes(self):
        # find note yg udh given permission
        from notes.models import Note
        return Note.objects.filter(
            models.Q(owner=self) |
            models.Q(notes_shared=self) |
            models.Q(shared_with__user=self)
        ).distinct()