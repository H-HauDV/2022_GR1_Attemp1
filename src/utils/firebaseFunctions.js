import { firestore } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
//Saving new item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};
