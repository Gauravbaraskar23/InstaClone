import React , { useEffect , useState} from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,StyleSheet,Dimensions,
} from "react-native";
import API from "../api/api";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_SIZE = SCREEN_WIDTH/3 - 4;

export default function ProfileScreen({ navigation, route}){
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing , setIsFollowing] = useState(false);

  const profileUsername =route?.params?.username;

  useEffect(() => {
    loadProfile();

  }, []);

  const loadProfile = async() =>{
    try{
      const userRes = profileUsername
      ? await API.get(`users/${profileUsername}/`)
      : await API.get("users/me/");

      setUser(userRes.data);
      setIsFollowing(userRes.data.is_following);

      const postsRes = await API.get("posts/");
      const myPosts = postsRes.data.filter(
        (post) => post.username === userRes.data.username

      );
      setPosts(myPosts);
    } catch (error) {
      console.log(error);

    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing){
        await API.post(`users/${user.username}/unfollow/`);
        setIsFollowing(false);
      } else{
        await API.post(`users/${user.username}/follow/`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error)

    }
  };

  if (!user) return null;

  const isMyProfile  = !profileUsername;

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{
            uri:
              user.profile_image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
          />

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.post_count}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.follower_count}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.following_count}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>

          </View>

      </View>
      {/* Username */}
      <Text style={styles.username}>{user.username}</Text>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        {isMyProfile ?(
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>

          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.followButton, isFollowing && styles.unfollowButton,

          ]}
          onPress={handleFollow}
          >
            <Text style={[
              styles.followButtonText,
              isFollowing && styles.unfollowButtonText,
            ]}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
        )}
        
      </View>

        {/* Posts grid */}
        <FlatList
          data={posts}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator ={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail", {post: item})
            }
          >
            <Image source={{ uri: item.image_url}}
              style={styles.postImage}
            />
          </TouchableOpacity>
          )}
          />
    </View>

    
          
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",

  },
  header : {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  avatar : {
    width:90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
  },

  statsContainer: {
    flexDirection: "row",
    flex : 1,
    justifyContent: "space-around",


  },

  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel :{
    fontSize: 13,
    color : "#666",
  },

  username: {
    fontSize :16,
    fontWeight: "bold",
    paddingHorizontal :15,
    marginBottom: 10,
  },

  actionContainer : {
    paddingHorizontal: 15,
    marginBottom: 10,

  },

  editButton: {
    borderWidth : 1,
    borderColor : "#ccc",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },

  editButtonText: {
    fontWeight: "bold",

  },

  followButton: {
    backgroundColor: "#3897f0",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },

  followButtonText: {
    color: "#fff",
    fontWeight: "bold",

  },

  unfollowButton: {
    backgroundColor: "#eee",

  },

  unfollowButtonText: {
    color: "#000",
  },

  postImage:{
    width: IMAGE_SIZE,
    height:IMAGE_SIZE,
    margin: 2,
  },
});