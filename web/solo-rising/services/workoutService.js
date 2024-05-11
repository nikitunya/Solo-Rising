import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";

export const createWorkout = async (title, exerciseList) => {
  try {
    const userWorkoutsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "workouts"
    );

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

export const getWorkouts = async () => {
  try {
    const userWorkoutsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "workouts"
    );
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

export const updateWorkout = async (workoutId, updatedData) => {
  try {
    const workoutRef = doc(
      db,
      "users",
      auth.currentUser?.uid,
      "workouts",
      workoutId
    );
    await updateDoc(workoutRef, updatedData);
    console.log("Updated succesfully");
  } catch (error) {
    console.error("Error updating workout: ", error);
    throw error;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const workoutRef = doc(
      db,
      "users",
      auth.currentUser?.uid,
      "workouts",
      workoutId
    );
    await deleteDoc(workoutRef);
    console.log("Workout deleted successfully");
  } catch (error) {
    console.error("Error deleting workout: ", error);
    throw error;
  }
};
