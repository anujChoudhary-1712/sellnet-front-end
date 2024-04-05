import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDQTG8FxypCvNI6CpKAtbdMlUBIq82Wvyg",
    authDomain: "creatify-16316.firebaseapp.com",
    projectId: "creatify-16316",
    storageBucket: "creatify-16316.appspot.com",
    messagingSenderId: "194613505052",
    appId: "1:194613505052:web:1c2dbc3a4adfb9552f03d9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)

export { auth,storage };