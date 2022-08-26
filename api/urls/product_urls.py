from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.allproductViews, name='allproducts'),
    path('create/product/', views.createProduct, name='create-product'),
    path('upload/image/', views.uploadImage, name='image-uploaded'),
    path('<str:pk>/review/', views.createReview, name='create-review'),
    path('top/products/', views.topProducts, name='top-products'),
    path('<str:pk>/', views.productView, name='product'),
    path('productupdate/<str:pk>/', views.updateProduct, name='update-product'),
    path('delete/<str:pk>/', views.deleteproduct, name='delete-product'),
    
]
