from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer

from piedpiper.users.permissions import IsUserOrReadOnly
from piedpiper.users.models import User

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)



class TaskListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsUserOrReadOnly,)