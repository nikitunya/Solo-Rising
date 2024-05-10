import {
  collection,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase.config";

export const saveExercises = async () => {
  try {
    console.log("Started");
    const exercisesCollectionRef = collection(db, "exercises");
    const batch = writeBatch(db);

    // Loop through each exercise in the exerciseList array
    exerciseData.forEach((exercise) => {
      // Create a new document reference for each exercise
      const newExerciseRef = doc(exercisesCollectionRef);

      // Set the data for the exercise document
      setDoc(newExerciseRef, exercise, { batch });
    });

    // Commit the batched write
    await batch.commit();

    console.log("Exercises were saved successfully");
  } catch (error) {
    console.error("Error saving exercises: ", error);
    throw error;
  }
};

export const getExercisesByName = async (name) => {
  try {
    const exercisesCollectionRef = collection(db, "exercises");
    const querySnapshot = await getDocs(exercisesCollectionRef);

    const exercises = [];
    querySnapshot.forEach((doc) => {
      const exerciseData = doc.data();
      if (exerciseData.name.toLowerCase().includes(name.toLowerCase())) {
        exercises.push({ id: doc.id, ...exerciseData });
      }
    });
    return exercises;
  } catch (error) {
    console.error("Error getting exercises by name: ", error);
    throw error;
  }
};

export const getAllExercises = async () => {
  try {
    const exercisesCollectionRef = collection(db, "exercises");
    const querySnapshot = await getDocs(exercisesCollectionRef);

    const exercises = [];
    querySnapshot.forEach((doc) => {
      exercises.push({ id: doc.id, ...doc.data() });
    });
    return exercises;
  } catch (error) {
    console.error("Error getting exercises: ", error);
    throw error;
  }
};
