from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Reminder
import requests

@receiver(post_save, sender=Reminder)
def trigger_notification(sender, instance, created, **kwargs):
    if not instance.notification_sent:
        requests.post(
            'http://notification-service/api/reminders',
            json={
                'reminder_id': str(instance._id),
                'user_id': instance.user,
                'title': instance.title,
                'due-date': instance.due_date.isoformat()
            },
            timeout=3
        )
