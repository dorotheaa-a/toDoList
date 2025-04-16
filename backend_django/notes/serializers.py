from rest_framework import serializers
from .models import Note

#convert queryset & complex data into native python 
# data type & easily render into json and etc. 
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'