from django.urls import path
from api.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='all-orders'),
    path('create/', views.addOrderItems, name = 'order-create'),
    path('myorders/', views.getUserOrders, name='userorders'),
    path('<str:pk>/delivered/', views.updateOrderToDelivered, name='order-delivered'),
    
    path('<str:pk>/', views.getOrderById, name='user-order'),
]
