import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, updateDoc, getDocs} from 'firebase/firestore';
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

async function createUser(name, email, password, photo, gender, role, age) {
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
      profile: photoURL,
      age: age,
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

async function getParameters(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
}


async function uploadCourse(course) {
  try {
    // Use the 'courses' collection reference
    const coursesCollection = collection(db, 'courses');

    // Add a new document with an auto-generated ID
    const newCourseRef = await addDoc(coursesCollection, { title: course.title, content: course.description });

    console.log('New course added with ID: ', newCourseRef.id);

    const thumbnailRef = ref(storage, `course_thumbnails/${newCourseRef.id}`);
    const snapshot = await uploadBytes(thumbnailRef, course.images);
    const thumbnailURL = await getDownloadURL(snapshot.ref);

    const videoRef = ref(storage, `course_videos/${newCourseRef.id}`);
    const snapshot2 = await uploadBytes(videoRef, course.videos);
    const videoURL = await getDownloadURL(snapshot2.ref);

    await updateDoc(doc(db, 'courses', newCourseRef.id), {
      thumbnail: thumbnailURL,
      video: videoURL
    });

    // Return the newly created document reference
    return newCourseRef;
  } catch (error) {
    console.error("Error object:", error);
    const errorMessage = error?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
}


const updateCollection = (docRef, data) => updateDoc(doc(db, 'users', docRef), data);

const getCourses = async () => {
  const coursesCollection = collection(db, 'courses');
  const coursesSnapshot = await getDocs(coursesCollection);
  const coursesData = coursesSnapshot.docs.map((doc) => doc.data());
  console.log(coursesData);
  return coursesData;
}


export { createUser, logInUser, auth , uploadCourse, getParameters, updateCollection, db, getCourses};
export default app;