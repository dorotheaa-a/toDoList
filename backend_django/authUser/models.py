from django.db import models

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, userEmail, userName, password=None, **extra_fields):
        if not userEmail:
            raise ValueError("Please enter your email")
        
        email = self.normalize_email(userEmail)
        user = self.model(userEmail=email, userName=userName, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    # def create_superuser


class CustomUser(AbstractBaseUser, PermissionsMixin):
    userId = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=150)
    userEmail = models.EmailField(unique=True)
    userPassword = models.CharField(max_length=128)

    