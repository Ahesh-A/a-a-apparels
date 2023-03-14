import { initializeApp } from "firebase/app";
import { Category } from "../../store/categories/category.types";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPyMm66ezyYsWwLWYeB3syIcNxLr_Dxhk",
  authDomain: "a-and-a-appraels.firebaseapp.com",
  projectId: "a-and-a-appraels",
  storageBucket: "a-and-a-appraels.appspot.com",
  messagingSenderId: "748749468636",
  appId: "1:748749468636:web:c06acc27e0d6986e935519",
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
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
export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.map((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    return batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export type AdditionalData = {
  displayName?: string
}
export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}
export const cerateUserDocumentFromAuth = async (
  userAuth: User,
  additionalData = {} as AdditionalData
): Promise<null | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return null;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(
        userDocRef,
        {
          displayName,
          email,
          createdAt,
          ...additionalData,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogleEmailAndPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const googleSignOut = async () =>
  await signOut(auth);

export const onAuthStateChangedListener = (callBack: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callBack);

export const getCategoriesAndDocs = async (coll: string): Promise<Category[]> => {
  const collectionRef = collection(db, coll);
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  return querySnapShot.docs.map((docSnapShot) => docSnapShot.data() as Category);
  // const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
  //   const {title, items} = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // },{});

  // return categoryMap;
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unSubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
