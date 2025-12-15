import React, { useEffect , useState} from "react";
import { FlatList, StyleSheet, RefreshControl,View, } from "react-native";

import API from "../api/api";
import PostCard from "../components/PostCard";

export default function HomeFeed() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = async () => {
    try {
      const res= await API.get("posts/feed/");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item}/>}
        showsHorizontalScrollIndicator= {false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

        }
        />
    </View>
  );
}

const styles= StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor: "#fff",
  },
});