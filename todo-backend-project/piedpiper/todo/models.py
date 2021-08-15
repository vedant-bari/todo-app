from django.db import models
from piedpiper.users.models import User

# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    task_name = models.CharField(max_length=140)
    description = models.TextField(blank=True,null=True)
    start_date = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    due_date = models.DateField(blank=True,null=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ('-start_date', )