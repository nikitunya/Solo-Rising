import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Function to get the download URL of an image from Firebase Storage
export const getImage = async (imageUrl) => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error getting image:", error);
    return null;
  }
};