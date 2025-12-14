import React, { useState } from "react";
import {
  View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ScrollView
} from "react-native";
import API from "../api/api";
import Icon from "react-native-vector-icons/Ionicons";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async() => {
    try{
      await API.post("register/", { username, email,  password });
      alert("Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error)
      alert("Please! Register first")
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source= {{
          uri: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",

        }}
        style= {styles.logo}
      />

      {/* Username  */}
      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color= "#333" style={styles.icon} />
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>

      {/* Email  */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color= "#333" style={styles.icon} />
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />
      </View>

      {/* Password  */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color= "#333" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>


      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>

      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButton}>Log In</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container :{
    flexGrow: 1,
    backgroundColor :'#fff',
    alignItems : "center",
    justifyContent: "center",
    paddingHorizontal:30,
    paddingVertical : 50,

  },

  logo :{
    width:100,
    height:100,
    marginBottom: 40,
    borderRadius: 50,

  },
  inputContainer :{
    flexDirection:"row",
    alignItems : "center",
    width : "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal : 10,
    marginBottom : 15,
  },
  icon: {
    marginRight : 10,
  },
  input: {
    flex: 1,
    height: 50,
    color : '#333',

  },
  button: {
    width :"100%",
    backgroundColor: "#3897f0",
    paddingVertical : 15,
    borderRadius: 10,
    alignItems :"center",
    marginTop :10,

  },
  buttonText :{
    color: "#fff",
    fontWeight: "bold",
    fontSize : 16,
  },
  loginContainer: {
    flexDirection : "row",
    marginTop:20,
  },

  loginText:{
    color :"#666",

  },
  loginButton: {
    color: "#3897f0",
    fontWeight: "bold",
  },

});