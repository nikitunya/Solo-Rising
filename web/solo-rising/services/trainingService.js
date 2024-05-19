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
import { getCurrentUserData, updateUserData } from "./auth";
import { updateCurrentUser } from "firebase/auth";
import { errorToast, successToast } from "../App/utils/toasts";

export const createTraining = async (training) => {
  try {
    getCurrentUserData().then((user) => {
      user.xp = user.xp + training.totalXp;
      if (user.xp > user.level * 1000) {
        user.level += 1;
      }
      updateUserData(user).then(() => {
        const userTrainingRef = collection(
          db,
          "users",
          auth.currentUser?.uid,
          "trainings"
        );
        const newTrainingRef = doc(userTrainingRef);
        setDoc(newTrainingRef, training);
      });
    });

    successToast("Training was saved successfully");
  } catch (error) {
    errorToast("Error while creating training");
  }
};

export const getTrainings = async (userId) => {
  try {
    const userWorkoutsRef = collection(
      db,
      "users",
      userId ? userId : auth.currentUser?.uid,
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

export const getTrainingStatistics = async (userId) => {
  const trainings = await getTrainings(userId);
  if (trainings) {
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
  }
};

export const getThisWeekTrainings = async (userId) => {
  try {
    const userTrainingsRef = collection(
      db,
      "users",
      userId ? userId : auth.currentUser?.uid,
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

export const getThisYearTrainings = async () => {
  try {
    const userTrainingsRef = collection(
      db,
      "users",
      auth.currentUser?.uid,
      "trainings"
    );

    const today = new Date();
    const startOfPreviousMonth = new Date(today.getFullYear() - 1, today.getMonth(), 1); 
    const endOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the current month
    
    const startTimestamp = Timestamp.fromDate(startOfPreviousMonth);
    const endTimestamp = Timestamp.fromDate(endOfCurrentMonth);


    const yearTrainingsSnapshot = await getDocs(
      query(
        userTrainingsRef,
        where("date", ">=", startTimestamp),
        where("date", "<=", endTimestamp)
      )
    );

    const yearTrainings = yearTrainingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return yearTrainings;
  } catch (error) {
    console.log(error);
  }
};
