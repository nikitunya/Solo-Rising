import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export const saveUserData = async (id, fullname, username) => {
  try {
    const userRef = doc(db, "users", id);;
    await setDoc(userRef, {
      fullName: fullname,
      username: username,
      xp: 0,
      level: 1,
    });
    console.log("User data saved successfully");
  } catch (error) {
    console.log(error);
  }
};
