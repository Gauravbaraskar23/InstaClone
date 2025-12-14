import React from "react";
import { View, Text, Image, Button } from "react-native";
import API from "../api/api";

export default function PostCard({ post }) {
  const likePost = () => {
    API.post(`posts/${post.id}/like/`);
  };

  return (
    <View>
      <Text>{post.username}</Text>
      <Image source={{ uri: post.image_url }} style={{ height: 300 }} />
      <Text>{post.caption}</Text>
      <Text>❤️ {post.likes_count}</Text>
      <Button title="Like" onPress={likePost} />
    </View>
  );
}
