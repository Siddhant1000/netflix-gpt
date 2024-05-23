// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlDL5wypI4Bw8C7cnCRdZMDI8WokgK3d4",
  authDomain: "netflixgpt-dd14a.firebaseapp.com",
  projectId: "netflixgpt-dd14a",
  storageBucket: "netflixgpt-dd14a.appspot.com",
  messagingSenderId: "810381287871",
  appId: "1:810381287871:web:eab35eaee467435f7d810a",
  measurementId: "G-5TVJGS1B80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();