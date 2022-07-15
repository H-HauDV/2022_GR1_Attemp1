import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUZaJH8T5QO40dLqqXgM_AlQ16dv3bnwM",
  authDomain: "food-ordering-app-2022-gr1.firebaseapp.com",
  databaseURL: "https://food-ordering-app-2022-gr1-default-rtdb.firebaseio.com",
  projectId: "food-ordering-app-2022-gr1",
  storageBucket: "food-ordering-app-2022-gr1.appspot.com",
  messagingSenderId: "849906662428",
  appId: "1:849906662428:web:d88e9d85235a442f0cb3d9",
  measurementId: "G-WHQB7XQ2QF",
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const database = getDatabase();
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, firestore, storage, database };
