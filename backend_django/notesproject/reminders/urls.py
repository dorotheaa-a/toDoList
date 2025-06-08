from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  ReminderListView, ReminderDetailView

# router = DefaultRouter()
# router.register(r'notes', NoteRetrieveUpdateDestroyView)

urlpatterns = [
    path('', ReminderListView.as_view(), name='reminder-list-create'),
    path('<uuid:pk>/', ReminderDetailView.as_view(), name='reminder-detail'),
]
