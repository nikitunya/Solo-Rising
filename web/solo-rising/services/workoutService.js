import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export const createWorkout = async (userId, title, exerciseList) => {
  try {
    const workoutRef = doc(db, "workouts", userId);
    await setDoc(workoutRef, {
        title: title,
        exerciseList: exerciseList,
      });
      console.log("Workout was saved successfully");
    return 1;
  } catch (error) {
    console.log(error);
  }
};