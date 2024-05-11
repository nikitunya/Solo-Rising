import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";

export const createTraining = async (training) => {
  try {
    const userWorkoutsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "trainings"
    );

    const newWorkoutRef = doc(userWorkoutsRef);

    await setDoc(newWorkoutRef, {
        training
    });

    console.log("Training was saved successfully");
  } catch (error) {
    console.log(error);
  }
};
