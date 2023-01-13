import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs

} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPyMm66ezyYsWwLWYeB3syIcNxLr_Dxhk",
  authDomain: "a-and-a-appraels.firebaseapp.com",
  projectId: "a-and-a-appraels",
  storageBucket: "a-and-a-appraels.appspot.com",
  messagingSenderId: "748749468636",
  appId: "1:748749468636:web:c06acc27e0d6986e935519"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

// export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log('done')

// };


export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.map((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const cerateUserDocumentFromAuth = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      }, { merge: true })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogleEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
}

export const googleSignOut = async (auth) => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callBack) => onAuthStateChanged(auth, callBack);

export const getCategoriesAndDocs = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map(docSnapShot => docSnapShot.data());
  // const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
  //   const {title, items} = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // },{});

  // return categoryMap;
}