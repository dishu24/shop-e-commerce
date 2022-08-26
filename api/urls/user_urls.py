
from django.urls import path
from api.views import users_views as views




urlpatterns = [
    
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/',views.registerUser, name='register-user'),
    path('profile/', views.userProfile, name='userprofile'),
    path('profile/update/', views.updateUserProfile, name='updateuserprofile'),

    # admin side ------------------------------>
    path('', views.allUsers, name='allusers'),
    path('<str:pk>/', views.usersById, name='update-user-by-id'),
    path('update/user/<str:pk>/', views.updateUser, name='update-user'),
    
    path('delete/<str:pk>/', views.deleteUser, name='delete-user'),
    
       
]