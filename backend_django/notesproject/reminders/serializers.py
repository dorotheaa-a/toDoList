from rest_framework import serializers
from .models import Reminder
from django.utils import timezone

class ReminderSerializer(serializers.ModelSerializer):
    priority_display = serializers.CharField(
        source='get_priority_display',
        read_only=True
    )
    
    class Meta:
        model = Reminder
        fields = ['id', 'title', 'description', 'due_date', 'priority', 'priority_display',
            'is_completed', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'notification_sent', 'priority_display']

        def validate_due_date(self, value):
            if value < timezone.now():
                raise serializers.ValidationError("Due date must be in the future")
            return value
        
        def validate_priority(self, value):
        # Ensure priority is valid (choices implemented for this)
            valid_priorities = [choice[0] for choice in Reminder.PRIORITY_CHOICES]
            if value not in valid_priorities:
                raise serializers.ValidationError(
                    f"Priority must be one of: {', '.join(valid_priorities)}"
                )
            return value