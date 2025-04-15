from django.db import models

# Create your models here.
from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    owner = models.CharField(max_length=100)
    shared_with = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title