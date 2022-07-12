import { firestore } from "../firebase.config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
//Saving new item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// Get food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

export const saveCartToFirebase = async (data) => {
  await setDoc(doc(firestore, "orders", `${Date.now()}`), data, {
    merge: true,
  });
};

