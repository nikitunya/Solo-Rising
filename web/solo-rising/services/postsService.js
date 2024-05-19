import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { auth } from "./firebase.config";
import { errorToast, successToast } from "../App/utils/toasts";
import { endOfTomorrow, startOfYesterday } from "date-fns";

export const getAllPosts = async () => {
  try {
    const currentUser = auth.currentUser.uid;
    const db = getFirestore();
    const postsRef = collection(db, "posts");

    const yesterday = startOfYesterday();
    const tomorrow = endOfTomorrow();

    // Convert JavaScript Date objects to Firestore Timestamp objects
    const startTimestamp = Timestamp.fromDate(yesterday);
    const endTimestamp = Timestamp.fromDate(tomorrow);

    const querySnapshot = await getDocs(
      query(
        postsRef,
        where("date", ">=", startTimestamp),
        where("date", "<=", endTimestamp)
      )
    );

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    const filteredPosts = posts.filter(post => post.unlockedBy.includes(currentUser));

    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};

export const createPost = async (postData) => {
  try {
    const db = getFirestore();
    const postsRef = collection(db, "posts");

    const newPostRef = await addDoc(postsRef, postData);

    successToast("Post created succesfully");
    return newPostRef.id;
  } catch (error) {
    errorToast("Error while creating Toast");
    return null;
  }
};
