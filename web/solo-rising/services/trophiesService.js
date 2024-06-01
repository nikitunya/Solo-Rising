import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { TROPHIES } from "../App/constants";
import { errorToast, successToast } from "../App/utils/toasts";
import { auth, db } from "./firebase.config";
import { getImage } from "./imageService";

export const saveTrophiesCustom = async () => {
  try {
    const trophiesCollectionRef = collection(db, "trophies");
    const batch = writeBatch(db);

    TROPHIES.forEach((trophie) => {
      const newTrophieRef = doc(trophiesCollectionRef);

      setDoc(newTrophieRef, trophie, { batch });
    });

    // Commit the batched write
    await batch.commit();

    successToast("Exercises were saved successfully");
  } catch (error) {
    errorToast("Error saving exercise");
    throw error;
  }
};

export const getTrophiesByType = async (type) => {
  try {
    const trophiesRef = collection(db, "trophies");
    const querySnapshot = await getDocs(
      query(trophiesRef, where("type", "==", type))
    );
    const trophiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return trophiesList;
  } catch (error) {
    errorToast("Error getting trophies");
    throw error;
  }
};

export const getTrophiesByName = async (name) => {
  try {
    const trophiesRef = collection(db, "trophies");
    const querySnapshot = await getDocs(
      query(trophiesRef, where("name", "==", name))
    );
    const trophiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return trophiesList;
  } catch (error) {
    errorToast("Error getting trophies");
    throw error;
  }
};

export const getAllTrophies = async () => {
  try {
    const trophiesRef = collection(db, "trophies");
    const querySnapshot = await getDocs(trophiesRef);
    const trophiesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return trophiesList;
  } catch (error) {
    errorToast("Error getting trophies");
    throw error;
  }
};

export const getBestThreeTrophies = async () => {
  try {
    const trophies = await getAllTrophies();

    const trophiesWithImages = await Promise.all(
      trophies.map(async (trophy) => {
        const imageUrl = await getImage(trophy.image);
        return { ...trophy, imageUrl };
      })
    );

    const groupedTrophies = {};

    trophiesWithImages.forEach((trophy) => {
      if (!groupedTrophies[trophy.name]) {
        groupedTrophies[trophy.name] = [];
      }
      groupedTrophies[trophy.name].push(trophy);
    });

    const sortedTrophies = [];
    Object.values(groupedTrophies).forEach((trophies) => {
      let bestTrophy = null;
      trophies.forEach((trophy) => {
        if (trophy.unlockedBy.includes(auth.currentUser.uid)) {
          if (!bestTrophy) {
            bestTrophy = trophy;
          } else if (
            (trophy.type === "gold") ||
            (trophy.type === "silver" && bestTrophy.type !== "gold") ||
            (trophy.type === "bronze" && bestTrophy.type === "bronze")
          ) {
            bestTrophy = trophy;
          }
        }
      });

      if (bestTrophy) {
        sortedTrophies.push(bestTrophy);
      }
    });

    return sortedTrophies.slice(0, 3);
  } catch (error) {
    console.error('Error fetching trophies:', error);
    return [];
  }
};

export const getTrophiesNotUnlockedByUser = async () => {
  try {
    const currentUser = auth.currentUser;
    const trophiesRef = collection(db, "trophies");
    const trophiesSnapshot = await getDocs(trophiesRef);
    const trophiesList = trophiesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const notUlockedTrophies = trophiesList.filter(
      (trophy) => !trophy.unlockedBy.includes(currentUser.uid)
    );

    return notUlockedTrophies;
  } catch (error) {
    console.error("Error fetching trophies:", error);
  }
};

export const updateTrophie = async (trophie) => {
  try {
    const trophieRef = doc(db, "trophies", trophie.id);
    await updateDoc(trophieRef, trophie);
    successToast("Updated succesfully");
  } catch (error) {
    errorToast("Error updating trophie");
    throw error;
  }
};

export const addBronzeTrophiesToNewUser = async (userId) => {
  try {
    const bronzeTrophies = await getTrophiesByType('bronze');

    const batch = writeBatch(db);

    bronzeTrophies.forEach((trophy) => {
      const trophyRef = doc(db, 'trophies', trophy.id);
      const updatedUnlockedBy = Array.isArray(trophy.unlockedBy) ? [...trophy.unlockedBy, userId] : [userId];

      batch.update(trophyRef, { unlockedBy: updatedUnlockedBy });
    });

    await batch.commit();

  } catch (error) {
    throw error;
  }
};