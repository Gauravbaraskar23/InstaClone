# from django.contrib import admin
from django.contrib import admin
from .models import Post, Like, Comment, Follow


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "caption", "created_at")
    list_filter = ("user", "created_at")
    search_fields = ("user__username", "caption")
    ordering = ("-created_at",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "text", "created_at")
    list_filter = ("created_at",)
    search_fields = ("user__username", "text")


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post")
    list_filter = ("user",)


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ("id", "follower", "following")
    list_filter = ("follower", "following")
    search_fields = ("follower__username", "following__username")
