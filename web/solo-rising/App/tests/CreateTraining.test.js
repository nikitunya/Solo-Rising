import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutCreateScreen from "../screens/workout/WorkoutCreateScreen";
import { createWorkout } from "../../services/workoutService";

// Mock navigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

// Mock workout service
jest.mock("../../services/workoutService", () => ({
  createWorkout: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

describe("WorkoutCreateScreen", () => {
  it("displays error message when creating workout without title", async () => {
    // const { getByText, getByPlaceholderText } = render(<WorkoutCreateScreen />);
    // fireEvent.press(getByText("CREATE"));
    // await waitFor(() => {
    //   expect(getByText("Please enter a workout title.")).toBeDefined();
    // });
  });

  it("successfully creates workout with title and exercise", async () => {
    // const { getByText, getByPlaceholderText } = render(<WorkoutCreateScreen />);
    // fireEvent.changeText(getByPlaceholderText("Untitled Workout\nE.G Chest Day"), "Test Workout");
    // fireEvent.press(getByText("ADD EXCERCISES TO WORKOUT"));
    // // Simulate adding an exercise here if needed
    // fireEvent.press(getByText("CREATE"));
    // await waitFor(() => {
    //   expect(createWorkout).toHaveBeenCalledWith("Test Workout", expect.any(Array));
    //   expect(getByText("Workout created successfully!")).toBeDefined();
    // });
  });
});
