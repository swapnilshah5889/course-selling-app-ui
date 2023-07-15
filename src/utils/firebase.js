import {initializeApp} from 'firebase/app';
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBWeYjmm5jeZHd1MYENLbQhO25NbfzZ2I0",
    authDomain: "course-selling-app-f7dab.firebaseapp.com",
    projectId: "course-selling-app-f7dab",
    storageBucket: "course-selling-app-f7dab.appspot.com",
    messagingSenderId: "782914650989",
    appId: "1:782914650989:web:7dceaf8ef4c0bc13fc5064",
    measurementId: "G-552S3T874V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

googleAuthProvider.setCustomParameters(
    {prompt:"select_account"}
);


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleAuthProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleAuthProvider);
export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookAuthProvider);

export const db = getFirestore();
