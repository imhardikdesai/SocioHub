import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaICQyxfnWUbiPEC_zzWH3Tx_7yYuCBZk",
    authDomain: "socio-hub-1d1d1.firebaseapp.com",
    projectId: "socio-hub-1d1d1",
    storageBucket: "socio-hub-1d1d1.appspot.com",
    messagingSenderId: "1069311804738",
    appId: "1:1069311804738:web:e8937f7955a22cccb1b4db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app)
