from django.db import models
from django.utils import timezone
from django.conf import settings
import uuid

# Create your models here.

class Reminder(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reminders'
    )    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    is_completed = models.BooleanField(default=False)
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
    notification_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'due_date']),
            models.Index(fields=['due_date']),
            models.Index(fields=['is_completed']),
            models.Index(fields=['priority']),
        ]
        ordering = ['-priority', 'due_date']
    
    def __str__(self):
        return f"Reminder {self.id}: {self.title}"
    
    def save(self, *args, **kwargs):
        # notif_sent to False if duedate change
        if self.pk:
            original = Reminder.objects.get(pk=self.pk)
            if original.due_date != self.due_date:
                self.notification_sent = False
        super().save(*args, **kwargs)