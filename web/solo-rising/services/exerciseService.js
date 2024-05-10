import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebase.config";

export const saveExercises = async () => {
    try {
        console.log("Started")
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
