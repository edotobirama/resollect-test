import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCH12DlOxheDa-vErYMpwEujL7RE1NTToo",
    authDomain: "resollect-9a5e6.firebaseapp.com",
    projectId: "resollect-9a5e6",
    storageBucket: "resollect-9a5e6.firebasestorage.app",
    messagingSenderId: "456961815997",
    appId: "1:456961815997:web:7a4a4095cf95107b208ed4",
    measurementId: "G-RGT1BRYJ24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
