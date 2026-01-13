import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("fittrack-app-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
console.log(API);
export const UserSignUp = (data) => API.post("/user/signup", data);
export const UserSignIn = (data) => API.post("/user/signin", data);

export const getDashboardDetails = () => API.get("/user/dashboard");

export const getWorkouts = (date) =>
  API.get(`/user/workout${date ? `?date=${date}` : ""}`);

export const addWorkout = (data) => API.post("/user/workout", data);
