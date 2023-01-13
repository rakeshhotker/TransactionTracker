from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Transaction(models.Model):
    username = models.CharField(max_length=100)
    amount = models.IntegerField()
    category = models.CharField(max_length=100)
    splitters = models.ManyToManyField(User)


class MoneyOwed(models.Model):
    tid = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    amount = models.IntegerField()
