import React from "react";
import {View , Text,Image, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function PostDetail({route}) {
    const {post} = route.params;
    // const [menuVisible, setMenuVisible] = useState(false);

    // const handleLogout =async () => {
    //     await AsyncStorage.removeItem("access");
    //     setMenuVisible(false);
    //     NavigationActivation.replace("Login");
    // }
    return(
        <View style= {styles.container}>
            <Text style={styles.username}>{post.username}</Text>

            <Image source={{uri: post.image_url}}
            style={styles.image}
            />

            <Text style={styles.caption}>{post.caption}</Text>

            <Text style={styles.meta}>
                {post.likes_count} Likes
            </Text>
            <Text style={styles.meta}>{post.comments_count} Comments</Text>
        
        </View>

    );
}

const styles =StyleSheet.create({
    container: {
        padding: 10,
    },
    username: {
        fontWeight: "bold",
        marginBottom: 8,

    },
    image: {
        width:"100%",
        height: 300,
        borderRadius:8,
    },
    caption: {
        marginTop: 8,
    },
    meta: {
        marginTop :4,
        color : "gray",
    },

});

// import React from "react";
// import { View, Text, Image, StyleSheet } from "react-native";

// export default function PostDetail({ route }) {
//   const { post } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.username}>{post.username}</Text>

//       <Image
//         source={{ uri: post.image_url }}
//         style={styles.image}
//       />

//       <Text style={styles.caption}>{post.caption}</Text>

//       <Text style={styles.meta}>
//         ❤️ {post.likes_count} Likes
//       </Text>

//       <Text style={styles.meta}>
//         💬 {post.comments_count} Comments
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   username: {
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     borderRadius: 8,
//   },
//   caption: {
//     marginTop: 8,
//   },
//   meta: {
//     marginTop: 4,
//     color: "gray",
//   },
// });
