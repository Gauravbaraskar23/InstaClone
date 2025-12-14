
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8000/api/"
    : "http://172.27.70.220:8000/api/";

const API = axios.create({
  baseURL : BASE_URL,
});

API.interceptors.request.use(async (req) =>{
  const token = await AsyncStorage.getItem("access");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export default API;

