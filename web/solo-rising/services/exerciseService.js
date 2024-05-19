import {
  collection,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { errorToast, successToast } from "../App/utils/toasts";

// export const saveExercises = async () => {
//   try {
//     const exercisesCollectionRef = collection(db, "exercises");
//     const batch = writeBatch(db);

//     exerciseData.forEach((exercise) => {
//       const newExerciseRef = doc(exercisesCollectionRef);

//       setDoc(newExerciseRef, exercise, { batch });
//     });

//     // Commit the batched write
//     await batch.commit();

//     successToast("Exercises were saved successfully");
//   } catch (error) {
//     errorToast("Error saving exercise");
//     throw error;
//   }
// };

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

export const createCustomExercise = async (exercise) => {
  try {
    const exerciseRef = collection(db, "exercises");

    const newExerciseRef = doc(exerciseRef);

    await setDoc(newExerciseRef, exercise);

    successToast("Excercise was created successfully");
  } catch (error) {
    errorToast("Error while create exercise");
    throw error;
  }
};

export const getExercisesByNames = async (names) => {
  try {
    const exercisesCollectionRef = collection(db, "exercises");

    const q = query(exercisesCollectionRef, where("name", "in", names));

    const querySnapshot = await getDocs(q);

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

export const updateExercise = async (exercise) => {
  try {
    // console.log(exercise)
    const exerciseRef = doc(db, "exercises", exercise.id);
    await updateDoc(exerciseRef, exercise);
    successToast("Updated succesfully");
  } catch (error) {
    errorToast("Error updating exercise");
    throw error;
  }
};
