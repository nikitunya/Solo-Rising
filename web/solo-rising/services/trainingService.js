import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { formatDuration, formatNumber } from "../App/utils/calculations";
import { startOfWeek, endOfWeek } from "date-fns";

export const createTraining = async (training) => {
  try {
    const userTrainingRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "trainings"
    );

    const newTrainingRef = doc(userTrainingRef);

    await setDoc(newTrainingRef, training);

    console.log("Training was saved successfully");
  } catch (error) {
    console.log(error);
  }
};

export const getTrainings = async () => {
  try {
    const userWorkoutsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "trainings"
    );
    const userTrainingSnaphsot = await getDocs(userWorkoutsRef);
    const userTrainings = userTrainingSnaphsot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userTrainings;
  } catch (error) {
    console.log(error);
  }
};

export const getTrainingStatistics = async () => {
  const trainings = await getTrainings();

  var trainingCount = trainings.length;
  var totalVolume = 0;
  var totalDuration = 0;

  trainings.forEach((training) => {
    totalVolume += training.volume || 0;
    totalDuration += training.duration || 0;
  });

  return {
    trainingCount,
    totalVolume,
    totalDuration,
    formattedVolume: formatNumber(totalVolume),
  };
};

export const getThisWeekTrainings = async () => {
  try {
    const userTrainingsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "trainings"
    );

    const today = new Date();
    const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // 1 is Monday
    const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

    const startTimestamp = Timestamp.fromDate(startOfWeekDate);
    const endTimestamp = Timestamp.fromDate(endOfWeekDate);
    const weekTrainingsSnapshot = await getDocs(
      query(
        userTrainingsRef,
        where("date", ">=", startTimestamp),
        where("date", "<=", endTimestamp)
      )
    );

    const weekTrainings = weekTrainingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return weekTrainings;
  } catch (error) {
    console.log(error);
  }
};
