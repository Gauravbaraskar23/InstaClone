import React from "react";
import {
  View,Text, Image, StyleSheet, TouchableOpacity,
} from "react-native";
import API from "../api/api"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
export default function PostCard({ post }) {
  const likePost = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      await API.post(`posts/${post.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // await API.post(
      //   `posts/${post.id}/unlike/`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // )
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{
            uri: post.user_profile_image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
          />
        <Text style={styles.username}>{post.username}</Text>
      </View>


      {/* Post Image */}
      <Image source= {{uri: post.image_url}} style={styles.image} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={likePost}>
          <Ionicons name="heart-outline" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name= "chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name= "paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{post.likes_count} likes</Text>

      <Text style={styles.caption}>
        <Text style={styles.username}>{post.username}</Text>
        {post.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:"#fff",
    marginBottom: 15,
  },

  header: {
    flexDirection:"row",
    alignItems: "center",
    padding: 10,
  },

  avatar: {
    width: 36,
    height : 36,
    borderRadius: 18,
    marginRight: 10,
  },

  username: {
    fontWeight: "bold",
    fontSize: 14,

  },

  image: {
    width: "100%",
    height:350,
  },

  actions : {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap : 15,
  },

  likes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 4,
  },

  caption: {
    paddingHorizontal: 10,
    marginBottom: 8,
  },

});

