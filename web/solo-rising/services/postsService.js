import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "./firebase.config";

export const getAllPosts = async () => {
  try {
    const currentUser = auth.currentUser.uid;
    const db = getFirestore();
    const postsRef = collection(db, "posts");
    
    const q = query(postsRef, where("unlockedBy", "array-contains", currentUser));
    
    const querySnapshot = await getDocs(q);
    
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
};