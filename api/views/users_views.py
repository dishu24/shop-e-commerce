from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            
            username = data['username'],
            email = data['email'],
            first_name = data['name'],
            password = make_password(data['password'])
        )
        print(user)


        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'message':'Email already exit'}, status= status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    
    user.username = data['username']
    user.email = data['email']
    user.first_name = data['name']

    if data['password'] != '':
        user.password = make_password(data['pasaword'])
    user.save()

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request):
    user = request.user
    serializer = UserSerializer(user, many= False)
    return Response(serializer.data)


# Admin Side -----------------------------------------------------------------------------------!!!!!!!!!!!!
@api_view(['GET'])
@permission_classes([IsAdminUser])
def allUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def usersById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request,pk):
    user = User.objects.get(id=pk)
    data = request.data
    
    
    user.username = data['username']
    user.email = data['email']
    user.first_name = data['name']
    user.is_staff = data['isAdmin']
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response({'message':'user deleted'})