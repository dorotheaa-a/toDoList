from rest_framework import serializers
from .models import Notifier

class NotifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifier
        fields = ['id', 'reminder_id', 'user', 'notify_at', 'is_sent', 'created_at', 'sent_at']
        read_only_fields = ['id', 'is_sent', 'created_at', 'sent_at']