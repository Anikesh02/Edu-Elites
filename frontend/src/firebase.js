import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAyK70xth6l440oHApZYS9teQk4NsifngI",
  authDomain: "edu-portal-a1c70.firebaseapp.com",
  projectId: "edu-portal-a1c70",
  storageBucket: "edu-portal-a1c70.appspot.com",
  messagingSenderId: "71856380387",
  appId: "1:71856380387:web:7904fe2ef4bc2de4a6e8d6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function createUser(name, email, password, photo, gender, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    let storageRef = ref(storage, `profile_photos/${userCredential.user.uid}`);
    console.log(photo);

    if (photo != null) {
          const snapshot = await uploadBytes(storageRef, photo);
          console.log('Uploaded the file!', snapshot);
    }
    else {
      storageRef = ref(storage, `profile_photos/genericprofile.png`);
    }

    const photoURL = await getDownloadURL(storageRef);
    console.log(photoURL);

    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL
    });

    const customUserData = {
      name: name,
      gender: gender,
      role: role,
      profile: photoURL
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), customUserData);

    return userCredential.user;

  } catch (error) {
    console.error("Error object:", error);

    const errorMessage = error?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
}

async function logInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorMessage = error.message;
    console.error("Login failed:", errorMessage);
    return null;
  }
}


export { createUser, logInUser, auth };
export default app;