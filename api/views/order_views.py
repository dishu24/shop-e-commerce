
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from api.models import Product, Order, OrderItem, ShippingAddress
from api.serializers import ProductSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItem = data['orderItems']

    if orderItem and len(orderItem) == 0:
        return Response({'message':'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # create order

        order = Order.objects.create(
            user = user,
            payment_method = data['paymentMethod'],
            shipping_price = data['shippingprice'],
            total_price = data['totalprice']
        )

        # shipping address 

        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            zipcode = data['shippingAddress']['zipcode'],
            state = data['shippingAddress']['state'],
            country = data['shippingAddress']['country']

        )

        # Create order items adn set order to orderItem

        for item in orderItem:
            product = Product.objects.get(_id=item['product_id'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                quantity = item['quantity'],
                price = item['price'],
                image = product.image.url,
            )

            # update product stock quantity
            product.inStock -= item.quantity
            print(item)
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'message':'Not authorized.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'message':'Order does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


# Admin side --------------------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):
    order = Order.objects.get(_id=pk)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()
    return Response('Order delivered')