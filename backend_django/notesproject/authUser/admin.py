from django.contrib import admin
from django.db import models

# Register your models here.

class GFG(models.Model):
    user_name = models.CharField(max_length=100)
    user_email = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return super().__str__()