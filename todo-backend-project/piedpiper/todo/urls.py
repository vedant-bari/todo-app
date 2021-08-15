from django.urls import path
from .views import TaskListCreateView, TaskListDetailView
# UserFollowersListCreateView


urlpatterns = [
    path('tasklistcreate/',TaskListCreateView.as_view()),
    path('taskdetail/<int:pk>/',TaskListDetailView.as_view())
]    