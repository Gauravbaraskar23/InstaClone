from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from .views import RegisterView , UserViewSet, PostViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)
# router.register(r'users', UserViewSet)
# router.register(r'posts', PostViewSet)

urlpatterns = [
    path('register/' , RegisterView.as_view() , name = 'register'),
    path('login/' , TokenObtainPairView.as_view() , name = 'token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view() , name = 'token_refresh'),
    path('' , include(router.urls)),
    
]
