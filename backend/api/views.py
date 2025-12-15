from django.shortcuts import render
from rest_framework import viewsets , status , generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .models import Post, Like, Comment, Follow
from .serializers import PostSerializer, CommentSerializer, UserSerializer, RegisterSerializer
import random

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # --
    
    @action(detail=False, methods= ['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail = True, methods= ['post'])
    def follow(self, request, pk= None):
        user_to_follow = self.get_object()
        if user_to_follow == request.user:
            return Response({'error': 'Cannot follow yourself'}, status= 400)
        Follow.objects.get_or_create(follower= request.user, following = user_to_follow)
        # follow, created = Follow.objects.get_or_create(
        #     follower = request.user,
        #     following = user_to_follow
            
        # )
        # if created:
        #     return Response({'message': 'Followed successfully'}, status= status.HTTP_201_CREATED)
        # return Response({'message': 'Followed'}, status= status.HTTP_200_OK)
        return Response({'message': 'Followed'})
    
    @action(detail =True , methods= ['post'])
    def unfollow(self, request, pk=None):
        Follow.objects.filter(follower= request.user , following= self.get_object()).delete()
        return Response({'message': 'Unfollowed'})
        # user_to_unfollow  = self.get_object()
        # deleted = Follow.objects.filter(
        #     follower = request.user,
        #     following = user_to_unfollow
        # ).delete()
        
        # if deleted[0] >0 :
        #     return Response({'message' : 'Unfollowed successfully'}, status= status.HTTP_200_OK)
        # return Response({'error': 'Not following this user'}, status= status.HTTP_400_BAD_REQUEST)
    
    @action(detail= True, methods=['get'])
    def is_following(self,request, pk =None):
        user = self.get_object()
        is_following = Follow.objects.filter(
            follower = request.user,
            following= user
        ).exists()
        return Response({'is_following': is_following})
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user= self.request.user)
        
    @action(detail= False, methods=['get'])
    def feed(self, request):
        # following_users = Follow.objects.filter(
        #     follower= request.user
        # ).values_list('following' , flat= True)
        
        # posts = Post.objects.filter(user__in = following_users)
        posts = Post.objects.all().order_by('?')
        serializer = self.get_serializer(posts , many= True, context= {'request': request})
        return Response(serializer.data)
    
    @action(detail= True, methods=['post'])
    def like(self, request, pk= None):
        post = self.get_object()
        Like.objects.get_or_create(user= request.user, post= post)
        
        # if created:
        return Response({'message': 'Post liked'}, status= status.HTTP_201_CREATED)
        # return Response({'message' : 'Already liked'}, status= status.HTTP_200_OK)
    
    
    @action(detail= True, methods= ['post'])
    def unlike(self, request, pk =None):
        post = self.get_object()
        deleted = Like.objects.filter(user= request.user, post = post).delete()
        
        if deleted[0] > 0:
            return Response({'message': 'Post unliked'}, status = status.HTTP_200_OK)
        return Response({'error': 'Not Liked'}, status= status.HTTP_400_BAD_REQUEST)
    
    @action(detail= True, methods= ['post'])
    def comment(self, request, pk =None):
        post = self.get_object()
        serializer = CommentSerializer(data= request.data)
        
        if serializer.is_valid():
            serializer.save(user = request.user, post= post)
            return Response(serializer.data , status= 201)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    