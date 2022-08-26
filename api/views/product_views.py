from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  IsAdminUser, IsAuthenticated
from api.models import Product, Review
from api.serializers import ProductSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



@api_view(['GET'])
def allproductViews(request):
    query = request.query_params.get('keyword')
    # print(query)
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products,6)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_page)

    if page == None:
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page,'pages':paginator.num_pages})
    

@api_view(['GET'])
def topProducts(request):
    products = Product.objects.filter(rating__gt = 4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def productView(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['Delete'])
@permission_classes([IsAdminUser])
def deleteproduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    
    return Response('Product deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='sample name',
        price=0,
        brand='sample brand',
        inStock=0,
        category='sample category',
        description= 'sample dis'
    )
    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data=request.data
    product = Product.objects.get(_id=pk)
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.category=data['category']
    product.description=data['description']
    product.inStock = data['inStock']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAdminUser])
# @csrf_exempt
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product= Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image uploaded') 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReview(request, pk):
    user = request.user
    product =Product.objects.get(_id=pk)
    data = request.data

    # already exist
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        msg = {'message':'product review already exist'}
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)

    # no rating
    elif data['rating'] == 0:
        msg = {'message':'Please rating'}
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)
    
    # create review
    else:
        review =Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        reviews = product.review_set.all()
        product.numreviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()
        return Response('Review added')


