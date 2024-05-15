import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { getCurrentUserData, getUserData, updateUserData } from "./auth";

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

    console.log(usersList);
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
    console.log("Friend request sent successfully!");
  } catch (error) {
    console.error("Error sending friend request:", error);
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

    console.log(requestsList);
    return requestsList;
  } catch (error) {
    console.error("Error fetching friend requests:", error);
  }
};

export const deleteFriendRequest = async (requestId) => {
  try {
    await deleteDoc(doc(db, "friendRequests", requestId));
    console.log("Friend request deleted successfully!");
  } catch (error) {
    console.error("Error deleting friend request:", error);
    throw error;
  }
};

export const acceptFriendRequest = async (requestId, senderId) => {
  try {
    getCurrentUserData().then((currentUser) => {
      getUserData(senderId).then((senderData) => {
        var senderDataCopy = { ...senderData };
        senderData = { ...senderData, id: senderId };

        const currentUserFriendList = currentUser.friendList || [];
        const senderUserFriendList = senderData.friendList || [];
        currentUserFriendList.push(senderData);
        currentUser = { ...currentUser, friendList: currentUserFriendList };
        updateUserData(currentUser).then(() => {
          currentUser = { ...currentUser, id: auth.currentUser?.id };
          senderUserFriendList.push(currentUser);
          senderDataCopy = { ...senderDataCopy, friendList: senderUserFriendList }; // TODO: doesnt save to sender
          updateUserData(senderDataCopy).then(() => {
            deleteFriendRequest(requestId);
          })
        });
      });
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};
