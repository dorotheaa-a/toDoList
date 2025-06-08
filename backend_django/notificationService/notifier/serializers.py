from rest_framework import serializers
from .models import Notifier

class NotifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifier
        fields = [
            'id', 'reminder_id', 'reminder_title', 'reminder_due_date',
            'notification_sent', 'scheduled_at', 'sent_at'
        ]

        read_only_fields = ['id', 'notification_sent', 'scheduled_at', 'sent_at']