import {
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

export const createWorkout = async (userId, title, exerciseList) => {
  try {
    const userWorkoutsRef = collection(db, "users", userId, "workouts");

    const newWorkoutRef = doc(userWorkoutsRef);

    await setDoc(newWorkoutRef, {
      title: title,
      exerciseList: exerciseList,
    });

    console.log("Workout was saved successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getWorkouts = async (userId) => {
  try {
    const userWorkoutsRef = collection(db, "users", userId, "workouts");

    const userWorkoutsSnapshot = await getDocs(userWorkoutsRef);

    const userWorkouts = userWorkoutsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return userWorkouts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateWorkout = async (userId, workoutId, updatedData) => {
  try {
    const workoutRef = doc(db, "users", userId, "workouts", workoutId);
    await updateDoc(workoutRef, updatedData);
    console.log("Updated succesfully");
  } catch (error) {
    console.error("Error updating workout: ", error);
    throw error;
  }
};
