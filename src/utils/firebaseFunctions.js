import { firestore } from "../firebase.config";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  updateDoc,
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
    query(collection(firestore, "foodItems"))
  );

  // return items.docs.map((doc) => doc.data());
  let retArr = [];
  items.docs.map((doc) => {
    let obj=doc.data();
    obj.id=doc.id
    retArr.push(obj)
  });
  return retArr;
};
// Save order
export const saveOrder = async (data) => {
  await setDoc(doc(firestore, "orders", `${Date.now()}`), data, {
    merge: true,
  });
};
//Get all order
export const getAllOrder = async () => {
  const items = await getDocs(query(collection(firestore, "orders")));
  let retArr = [];
  items.docs.map((doc) => {
    let obj=doc.data();
    obj.id=doc.id
    retArr.push(obj)
  });
  // return items.docs.map((doc) => doc.data());
  return retArr;
};

// Save user additional info
export const saveUserAdditionalInfo = async (data) => {
  
  await setDoc(doc(firestore, "users", data.uid), data, {
    merge: true,
  });
};

// Update order status
export const updateOrderStatus = async (data) => {
  const orderRef = doc(firestore, "orders", data.id);
  await updateDoc(orderRef, {
    status: data.status
  });
};