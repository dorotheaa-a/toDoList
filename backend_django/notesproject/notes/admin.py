from django.contrib import admin
from .models import Note

# Register your models here.

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
        list_display = ('title', 'owner', 'created_at')
        search_fields = ('content',)
        list_filter = ('created_at',)

        def _id(self, obj):
                return str(obj._id)
        _id.short_description = 'MongoDB ID'