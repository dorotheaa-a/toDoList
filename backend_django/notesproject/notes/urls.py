from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  NoteListCreateView, NoteRetrieveUpdateDestroyView

# router = DefaultRouter()
# router.register(r'notes', NoteRetrieveUpdateDestroyView)

urlpatterns = [
    # path('', include(router.urls)),
    path('notes/', NoteListCreateView.as_view(),  name='note-list-create'),
    path('notes/<uuid:pk>/', NoteRetrieveUpdateDestroyView.as_view(), name='note-detail'),
]

