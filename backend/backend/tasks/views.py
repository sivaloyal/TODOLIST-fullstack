from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.decorators import api_view
from rest_framework.response import Response


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@api_view(["POST"])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=400
        )

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {"message": "User registered successfully"}
    )


@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user:
        return Response({
            "message": "Login successful",
            "username": user.username
        })

    return Response(
        {"error": "Invalid credentials"},
        status=401
    )
    