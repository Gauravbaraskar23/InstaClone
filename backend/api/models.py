from enum import unique
from django.db import models
from django.contrib.auth.models import User

class Follow(models.Model):
    following = models.ForeignKey(User , on_delete= models.CASCADE , related_name= 'followers')
    follower = models.ForeignKey(User , on_delete=  models.CASCADE , related_name = 'following')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('follower' , 'following')
        
    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"
    
class Post(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name= 'posts')
    image_url = models.URLField(max_length=500)
    caption = models.TextField(blank = True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Post by {self.user.username}"
    
class Like(models.Model):
    user = models.ForeignKey(User , on_delete= models.CASCADE, related_name= 'likes')
    post = models.ForeignKey(Post , on_delete=models.CASCADE  , related_name= 'likes')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'post')
        
    # def __str__(self):
    #     return f"{self.user.username} likes post {self.post.id}"
        # return f"{self.user.username} likes post {self.post.id}"
        
class Comment(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='comments')
    post = models.ForeignKey(Post , on_delete=models.CASCADE , related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.user.username}: {self.text[:20]}"
    
    
        
    
