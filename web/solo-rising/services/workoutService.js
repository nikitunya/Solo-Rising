import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { errorToast, successToast } from "../App/utils/toasts";

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
    successToast("Workout was saved successfully");
  } catch (error) {
    errorToast("Error while creating workout");
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
    successToast("Updated succesfully");
  } catch (error) {
    errorToast("Error updating workout");
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
    successToast("Workout deleted successfully");
  } catch (error) {
    errorToast("Error deleting workout");
    throw error;
  }
};
