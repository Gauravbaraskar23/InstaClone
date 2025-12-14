from dataclasses import fields
from rest_framework import serializers 
from django.contrib.auth.models import User
from .models import Post, Like, Comment, Follow

class UserSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'follower_count', 'following_count', 'post_count']
        
    def get_follower_count(self,obj):
        return obj.followers.count()
    
    def get_following_count(self, obj):
        return obj.following.count()
    
    def get_post_count(self, obj):
        return obj.posts.count()
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # user = User.objects.create_user(
        #     username=validated_data['username'],
        #     email = validated_data['email'],
        #     password=validated_data['password']
        # )
        # return user
        return User.objects.create_user(**validated_data)
    
class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model= Comment
        fields = ['id','user' ,'username', 'text', 'created_at']
        read_only_fields = ['user']
        
class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source= 'user.username', read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many= True, read_only= True)
    
    class Meta:
        model = Post
        # fields = ['id', 'user', 'username', 'image_url', 'caption',
        #           'created_at', 'likes_count', 'comments_count', 'is_liked', 'comments']
        fields = '__all__'
        read_only_fields = ['user']
        
    def get_likes_count(self , obj):
        return obj.likes.count()
    
    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, post= obj).exists()
        return False
        