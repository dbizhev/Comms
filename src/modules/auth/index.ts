import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const auth = getAuth();

export const SignInWithSocialMedia = () =>
    new Promise<any>((resolve, reject) => {
    const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => resolve(result))
            .catch(error => reject(error));
    });