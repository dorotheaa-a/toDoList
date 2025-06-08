from django.db import models
from django.conf import settings
import uuid
# Create your models here.

class Notifier(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    reminder_id = models.UUIDField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    notify_at = models.DateTimeField()  
    is_sent = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['reminder_id']),
            models.Index(fields=['user']),
            models.Index(fields=['is_sent']),
        ]

    def __str__(self):
        return f"Notify {self.user.email} @ {self.notify_at} for reminder {self.reminder_id}"