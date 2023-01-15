from django.urls import path
from . import views
urlpatterns = [
    path('', views.test),
    path('createUser', views.createUser),
    path('get/<username>', views.getUser),
    path('getAllUsers', views.getAllUsers),
    path('createTransaction/<username>/<amount>/<category>',
         views.createTransaction),
    path('getTransactionOfUser/<username>', views.getTransactionOfUser),
    path('storeMoneyOwedByUser/<username>/<amount>/<tid>',
         views.StoreMoneyOwedByUser),
    path('getMoneyOwedByUser/<username>', views.getMoneyOwedByUser),
    path('authenticateUser', views.authenticateUser),
    path('deleteTransaction/<tid>', views.deleteTransaction)
]
