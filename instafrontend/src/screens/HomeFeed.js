import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import API from "../api/api";
import PostCard from "../components/PostCard";

export default function HomeFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("posts/feed/").then(res => setPosts(res.data));
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
}
