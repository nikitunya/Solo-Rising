import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // todo: add email verification
    const user = userCredential.user;
    console.log("User registered");
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        return userData;
      } else {
        console.log("User document not found in Firestore.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  } else {
    console.log("No user signed in.");
    return null;
  }
};

export const updateUserData = async (newData, userId) => {
  try {
    const userDocRef = doc(db, "users", userId ? userId : auth?.currentUser?.uid);
    await setDoc(userDocRef, newData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData;
    } else {
      console.log("User document not found in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}