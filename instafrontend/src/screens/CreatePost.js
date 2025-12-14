
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,

  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import API from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreatePost({ navigation }) {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const isValidUrl = (url) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const createPost = async () => {
    if (!imageUrl) {
      Alert.alert("Error", "Image URL is required");
      return;
    }

    if (!isValidUrl(imageUrl)) {
      Alert.alert("Error", "Enter a valid image URL (http/https)");
      return;
    }

    const token = await AsyncStorage.getItem("access");

    try {
      await API.post(
        "posts/",
        {
          image_url: imageUrl,
          caption: caption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Post created!");
      navigation.goBack();
    } catch (error) {
      console.log("POST ERROR:", error.response?.data);
      Alert.alert("Error", "Failed to create post");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>New Post</Text>

      {/* Image Preview */}
      {isValidUrl(imageUrl) ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.previewImage}
          onError={() => Alert.alert("Error", "Image cannot be loaded")}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Image Preview</Text>
        </View>
      )}

      {/* Image URL */}
      <TextInput
        placeholder="Image URL (https://...)"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* Caption */}
      <TextInput
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        style={[styles.input, styles.captionInput]}
        multiline
      />

      {/* Button */}
      <TouchableOpacity style={styles.postButton} onPress={createPost}>
        <Text style={styles.postButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    padding : 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  previewImage:{
    width:"100%",
    height:300,
    borderRadius:10,
    marginBottom:15,

  },
  placeholder: {
    widht :"100%",
    height: 300,
    backgroundColor:"#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 15,
  },

  placeholderText:{
    color: "#888",
  },
// add
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  captionInput: {
    height: 90,
    textAlignVertical: "top",
  },
  postButton: {
    backgroundColor: "#3897f0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
