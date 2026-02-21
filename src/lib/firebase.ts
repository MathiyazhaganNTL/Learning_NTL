import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBsokuB5TMbhSDChK11i8yGOiG61c07E2k",
    authDomain: "learnsphere-48f5d.firebaseapp.com",
    projectId: "learnsphere-48f5d",
    storageBucket: "learnsphere-48f5d.firebasestorage.app",
    messagingSenderId: "338674565830",
    appId: "1:338674565830:web:afdedf604415de13f00dc7",
    measurementId: "G-BHMBMEXF67"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
