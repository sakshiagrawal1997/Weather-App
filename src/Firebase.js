import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq1_gqFNqCb4l9Mycgxau5y4M9fpBjylk",
  authDomain: "weather-app-a2aec.firebaseapp.com",
  projectId: "weather-app-a2aec",
  storageBucket: "weather-app-a2aec.appspot.com",
  messagingSenderId: "543102529739",
  appId: "1:543102529739:web:5f50dd6b5fa7c8595f2b4e"
};
 const app = initializeApp(firebaseConfig);

 const auth = getAuth();

export  { app, auth };