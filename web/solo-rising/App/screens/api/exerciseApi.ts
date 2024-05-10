import axios from "axios";

const api = axios.create({
  baseURL: "https://exerciseapi3.p.rapidapi.com/exercise",
  headers: {
    "X-RapidAPI-Key": "e26bdbf131msha5c54e8eb398c29p145b98jsn32e1c9d486dd",
    "X-RapidAPI-Host": "exerciseapi3.p.rapidapi.com",
  },
});

export async function getExercisesByName(name) {
  try {
    const response = await api.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getExercisesByPrimaryMuscle(primaryMuscle) {
  try {
    const response = await api.get(`/primary_muscle/${primaryMuscle}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getExercisesBySecondaryMuscle(secondaryMuscle) {
  try {
    const response = await api.get(`/secondary_muscle/${secondaryMuscle}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

