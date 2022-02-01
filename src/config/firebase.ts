import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import config from './config';

const Firebase = initializeApp(config.firebase);

// Add or Remove authentification methods here.
export const Providers = {
    google: new GoogleAuthProvider(),
};

export const db = getFirestore(Firebase);
export const auth = getAuth();
export default Firebase;