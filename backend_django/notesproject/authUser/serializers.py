from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# User Serializer — general purpose
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')
        read_only_fields = ('id',)


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={'input_type': 'password'}
    )
    email = serializers.EmailField(validators=[validate_email])

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user


# Login Serializer for JWT TokenObtainPairView
class LoginSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD  # Email-based login

    def validate(self, attrs):
        # authenticate using email and password
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password'),
        }

        user = authenticate(
            request=self.context.get('request'),
            **credentials
        )

        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("Account disabled")

        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        }


class ResetPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        min_length=8,
        style={'input_type': 'password'}
    )
