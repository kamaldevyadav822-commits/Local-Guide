import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAMUJ4ZYXfvMT-ekx3R5D7pF7E9uk9e5hU",
    authDomain: "local-guide-5e017.firebaseapp.com",
    projectId: "local-guide-5e017",
    storageBucket: "local-guide-5e017.firebasestorage.app",
    messagingSenderId: "361805363231",
    appId: "1:361805363231:web:4e13d996d1db3ad573fd2a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
