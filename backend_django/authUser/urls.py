from django.urls import path
from .views import RegisterView, LoginView 
# add more views as necessary

urlpatterns = [
    path('reqgister/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]