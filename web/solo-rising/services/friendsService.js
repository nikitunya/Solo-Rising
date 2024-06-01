import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { getCurrentUserData, getUserData, updateUserData } from "./auth";
import { errorToast, successToast } from "../App/utils/toasts";

export const getFriends = async (searchInput) => {
  try {
    const currentUser = auth.currentUser;
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    // const usersSnapshot = await collection("users")
    //   .where("name", ">=", searchInput)
    //   .where("name", "<=", searchInput + "\uf8ff")
    //   .get();

    const usersList = usersSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((user) => user.id !== currentUser.uid);

    return usersList;
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = async (
  senderId,
  recipientId,
  senderUsername
) => {
  try {
    await addDoc(collection(db, "friendRequests"), {
      senderId: senderId,
      recipientId: recipientId,
      date: new Date(),
      status: "pending",
      senderUsername: senderUsername,
    });
    successToast("Friend request sent successfully!");
  } catch (error) {
    errorToast("Error sending friend request");
    throw error; // Optionally, you can re-throw the error to handle it in the UI
  }
};

export const getFriendRequests = async () => {
  try {
    const currentUser = auth.currentUser;
    const requestsRef = collection(db, "friendRequests");
    const querySnapshot = await getDocs(
      query(requestsRef, where("recipientId", "==", currentUser.uid))
    );
    const requestsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return requestsList;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
  }
};

export const deleteFriendRequest = async (requestId) => {
  try {
    await deleteDoc(doc(db, "friendRequests", requestId));
    successToast("Friend request deleted successfully!")
  } catch (error) {
    errorToast("Error deleting friend request");
    throw error;
  }
};

export const acceptFriendRequest = async (requestId, senderId) => {
  try {
    const currentUser = await getCurrentUserData();
    const senderData = await getUserData(senderId);

    const currentUserFriendList = currentUser.friendList || [];
    const senderUserFriendList = senderData.friendList || [];


    if (!currentUserFriendList.some(friend => friend.id === senderId)) {
      currentUserFriendList.push({ id: senderId, username: senderData.username });
    }
    currentUser.friendList = currentUserFriendList;
    await updateUserData(currentUser);

    if (!senderUserFriendList.some(friend => friend.id === auth.currentUser.uid)) {
      senderUserFriendList.push({ id: auth.currentUser.uid, username: currentUser.username });
    }
    senderData.friendList = senderUserFriendList;
    console.log(currentUser)
    console.log(senderData)
    await updateUserData(senderData);

    // await deleteFriendRequest(requestId);
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};
