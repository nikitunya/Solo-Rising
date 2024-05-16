import axios, { AxiosRequestConfig, ResponseType } from "axios";

const api = axios.create({
  baseURL: "https://muscle-group-image-generator.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "e26bdbf131msha5c54e8eb398c29p145b98jsn32e1c9d486dd",
    "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
  },
});

export async function getAllMuscleGroups() {
  try {
    const response = await api.get("/getMuscleGroups");
    return response.data;
  } catch (error) {
    console.error("Error fetching muscle groups:", error);
    throw new Error("Failed to fetch muscle groups");
  }
}

export async function getImagePrimaryAndSecondaryMuscles(
  primaryMuscleGroups: string[],
  secondaryMuscleGroups: string[]
) {
  try {
    const response = await api.get("/getMulticolorImage", {
      params: {
        primaryColor: "29,78,216",
        secondaryColor: "96, 165, 250",
        primaryMuscleGroups: primaryMuscleGroups.join(","),
        secondaryMuscleGroups: secondaryMuscleGroups.join(","),
        transparentBackground: "1",
      },
      responseType: "blob" as ResponseType,
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error fetching multicolor image:", error);
    throw new Error("Failed to fetch multicolor image");
  }
}

export async function getImagePrimaryMuscles(muscleGroups: string[]) {
  try {
    const response = await api.get("/getImage", {
      params: {
        color: "29,78,216",
        muscleGroups: muscleGroups.join(","),
        transparentBackground: "1",
      },
      responseType: "blob" as ResponseType,
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image");
  }
}

export async function getBaseImage() {
  try {
    const response = await api.get("/getBaseImage", {
      params: {
        transparentBackground: "1",
      },
      responseType: "blob" as ResponseType,
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image");
  }
}