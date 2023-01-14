from django.shortcuts import render
from django.http import JsonResponse
import json
# Create your views here.
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from . models import *


def test(request):
    response = json.loads(request.body)
    return JsonResponse(response)

# createUser


def createUser(request):
    response = json.loads(request.body)
    username = response["username"]
    email = response["email"]
    password = response["password"]
    try:
        User.objects.create(username=username, password=password, email=email)
        return JsonResponse({"res": "success"})
    except:
        return JsonResponse({"res": "An error occured"})


def getUser(request, username):
    try:
        response = User.objects.filter(username=username)
        data = {}
        for i in response:
            i = model_to_dict(i)
            for j in i:
                data[j] = i[j]
        return JsonResponse(data)
    except:
        return JsonResponse({"res": "an error occured"})


def createTransaction(request, username, amount, category):
    splitterslist = json.loads(request.body)["splitters"]
    print(splitterslist)
    try:
        p1 = Transaction.objects.create(
            username=username, amount=amount, category=category)
        print(model_to_dict(p1))
        for i in splitterslist:
            p = User.objects.filter(username=i).first()
            print(p)
            p1.splitters.add(p)
        return JsonResponse({"tid": p1.id})
    except:
        return JsonResponse({"res": "an error occured"})


def getAllUsers(request):
    try:
        response = User.objects.all()
        totallist = []
        for i in response:
            data = {}
            i = model_to_dict(i)
            for j in i:
                data[j] = i[j]
            totallist.append(data)
        return JsonResponse({"Users": totallist})
    except:
        return JsonResponse({"res": "an error occured"})


def getTransactionOfUser(request, username):
    try:
        temp = []
        p = Transaction.objects.filter(username=username)
        for i in p:
            i = model_to_dict(i)
            print(i)
            data = {}
            for j in i:
                if j != "splitters":
                    data[j] = i[j]
                else:
                    temp1 = []
                    for k in i[j]:
                        k = model_to_dict(k)
                        temp1.append(k["username"])
                    data[j] = temp1
            temp.append(data)
        return JsonResponse({"Transactions": temp})
    except:
        return JsonResponse({"res": "An error occured"})

# track money owed by user


def StoreMoneyOwedByUser(request, username, amount, tid):
    try:
        p1 = Transaction.objects.filter(id=tid).first()
        p = MoneyOwed.objects.create(username=username, amount=amount, tid=p1)
        print(p)
        return JsonResponse({"res": "success"})
    except:
        return JsonResponse({"res": "An err occured"})


def getMoneyOwedByUser(request, username):
    try:
        owedList = []
        response = MoneyOwed.objects.filter(username=username)
        print(response)
        for i in response:
            data = {}
            i = model_to_dict(i)
            print(i)
            k = model_to_dict(Transaction.objects.filter(id=i["tid"]).first())
            print(k)
            data["transaction_done_by"] = k["username"]
            data["amount_you_owe"] = i["amount"]
            data["tid"] = k["id"]
            owedList.append(data)
        return JsonResponse({"owedList": owedList})
    except:
        return JsonResponse({"res": "An err occured"})
