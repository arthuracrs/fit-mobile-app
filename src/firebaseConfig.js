import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAomr_1QWiUTch0BoERu-PSTPdA8w74RF8",
  authDomain: "fit3-51954.firebaseapp.com",
  projectId: "fit3-51954",
  storageBucket: "fit3-51954.appspot.com",
  messagingSenderId: "325291385969",
  appId: "1:325291385969:web:94aaab491bff4da5b667d0",
  measurementId: "G-PQ0HK6LJ9N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);