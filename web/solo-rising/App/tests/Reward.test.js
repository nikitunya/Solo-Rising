import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutReviewScreen from "../screens/workout/WorkoutReviewScreen";
import { createPost } from "../../services/postsService";
import { createTraining } from "../../services/trainingService";
import {
  getExercisesByNames,
  updateExercise,
} from "../../services/exerciseService";
import {
  getTrophiesNotUnlockedByUser,
  updateTrophie,
} from "../../services/trophiesService";
import { auth } from "../../services/firebase.config";
import { TouchableOpacity } from "react-native-gesture-handler";

jest.mock("../../services/postsService", () => ({
  createPost: jest.fn(),
}));

jest.mock("../../services/trainingService", () => ({
  createTraining: jest.fn(),
}));

jest.mock("../../services/exerciseService", () => ({
  getExercisesByNames: jest.fn(),
  updateExercise: jest.fn(),
}));

jest.mock("../../services/trophiesService", () => ({
  getTrophiesNotUnlockedByUser: jest.fn(),
  updateTrophie: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

const mockRoute = {
  params: {
    training: {
      title: "Workout 1",
      volume: 150,
      duration: 3600,
      exercises: [
        {
          name: "Barbell Bench Press",
          sets: [{ reps: 10, weight: 150 }],
        },
      ],
    },
    view: false,
  },
};

describe("WorkoutReviewScreen", () => {
  it("creates a new post in friend's section about the trophies earned", async () => {
    // getExercisesByNames.mockResolvedValue([
    //   { name: "Barbell Bench Press", records: { [auth.currentUser.uid]: 100 } },
    // ]);
    // updateExercise.mockImplementation((exercise) => Promise.resolve());
    // getTrophiesNotUnlockedByUser.mockResolvedValue([
    //   {
    //     name: "New Trophy",
    //     exercises: [{ name: "Barbell Bench Press" }],
    //     requirment: 150,
    //     image: "trophy_image_url",
    //     unlockedBy: [],
    //   },
    // ]);
    // updateTrophie.mockImplementation((trophie) => Promise.resolve());
    // createPost.mockImplementation((post) => Promise.resolve());
    // const { getByText } = render(<WorkoutReviewScreen route={mockRoute} />);
    // fireEvent.press(getByText("End Workout"));
    // await waitFor(() => {
    //   expect(createTraining).toHaveBeenCalledTimes(1);
    //   expect(createPost).toHaveBeenCalledTimes(1);
    // });
  });
});
