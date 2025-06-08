# reminder call notify service
import requests

def notify_reminder(reminder):
    try:
        data = {
            "reminder_id": str(reminder.id),
            "reminder_title": reminder.title,
            "reminder_due_date": reminder.due_date.isoformat()
        }

        # should match docker or hostname
        url = "http://localhost:8001/notify/"
        response = requests.post(url, json=data)
        response.raise_for_status()

        print("Notification sent to notificationService.")
    except Exception as e:
        print("Failed to send notification:", e)