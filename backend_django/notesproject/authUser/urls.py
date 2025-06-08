from django.urls import path
from .views import RegisterView, LoginView, ResetPasswordView
# add more views as necessary

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('resetpass/', ResetPasswordView.as_view(), name='resetpass'),
]