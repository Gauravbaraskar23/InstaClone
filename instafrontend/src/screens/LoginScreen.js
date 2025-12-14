import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import API from "../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try{
      const res = await API.post("login/", {username, password});
      await AsyncStorage.setItem("access", res.data.access);
      navigation.replace("Main");

    } catch (error) {
      console.log(error);
      alert("Invalid credentials");

    }
  };


return(
  <View style={styles.container}>
    <Image source={{
      uri: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    }}
    style= {styles.logo}

    />

    <View style={styles.inputContainer}>
      <Icon name="person-outline" size={20} color="#333" style={styles.icon}/>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        placeholderTextColor="#666"
      />
    </View>

    <View style={styles.inputContainer}>
      <Icon name="lock-closed-outline" size={20} color="#333" style={styles.icon}/>
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style = {styles.input}
        placeholderTextColor="#666"

      />
    </View>

    <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Log In</Text>
    </TouchableOpacity>
    
    <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  </View>
  
);
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent  : "center",
    paddingHorizontal: 30,
  },
  logo: {
    width :100,
    height : 100,
    marginBottom: 40,
    borderRadius: 20,

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width : "100%",
    backgroundColor : "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal : 10,
    marginBottom : 15,
  },

  icon : {
    marginRight :10,

  },

  input :{
    flex :1,
    height : 50,
    color : '#333'

  },
  button:{
    width: "100%",
    backgroundColor :"#3897f0",
    paddingVertical : 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop : 10,
  },
  buttonText:{
    color: '#fff',
    fontWeight : "bold",
    fontSize : 16,
  },

  signupContainer: {
    flexDirection: "row",
    marginTop : 20,
  },

  signupText :{
    color : "#666",
  },

  signupButton: {
    color: "#3897f0",
    fontWeight: "bold",

  },

});
