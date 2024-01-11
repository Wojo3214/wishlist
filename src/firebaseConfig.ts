// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
//import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8W2hgTFUryAWa4N1Dv_5y8dKLkMKLbDg",
  authDomain: "makewish-259e1.firebaseapp.com",
  projectId: "makewish-259e1",
  storageBucket: "makewish-259e1.appspot.com",
  messagingSenderId: "185482482712",
  appId: "1:185482482712:web:8a8a19eddcdb3fbb8b1f6d",
  measurementId: "G-F5RMTKHHFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export const auth = initializeAuth(app, {
//     persistence: indexedDBLocalPersistence
// });

export const auth = getAuth(app);

// Create database reference
//export const database = getDatabase(app);
// Reference to posts in Realtime DB
//export const wishListsRef = ref(database, "wishLists");
// Reference to users in Realtime DB
//export const usersRef = ref(database, "users");
// Get reference to specific post using post id
// export function getPostRef(postId) {
//     return ref(database, "wishList/" + wishListId);
// }
// Get reference to specific user using user id
// export function getUserRef(userId: any) {
//     return ref(database, "users/" + userId);
// }

// Reference to the storage service
export const storage = getStorage(app);