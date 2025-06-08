from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  NoteListCreateView, NoteRetrieveUpdateDestroyView, NoteCollaboratorView

# router = DefaultRouter()
# router.register(r'notes', NoteRetrieveUpdateDestroyView)

urlpatterns = [
    # path('', include(router.urls)),
    path('', NoteListCreateView.as_view(),  name='note-list-create'),
    path('<uuid:pk>/', NoteRetrieveUpdateDestroyView.as_view(), name='note-detail'),
    path('collaborators/', NoteCollaboratorView.as_view(), name='note-collaborators'),
]

