import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutCreateScreen from "../screens/workout/WorkoutCreateScreen";
import { createWorkout } from "../../services/workoutService";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock("../../services/workoutService", () => ({
  createWorkout: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../services/firebase.config", () => ({
  auth: jest.fn(),
}));

global.alert = jest.fn();

describe("WorkoutCreateScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useIsFocused.mockReturnValue(true);
    jest.clearAllMocks();
  });

  it("displays error message when creating workout without title", async () => {
    const { getByText, getByPlaceholderText } = render(<WorkoutCreateScreen />);
    fireEvent.press(getByText("CREATE"));
    await waitFor(() => {
      expect(createWorkout).not.toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith("Title is required!");
    });
  });

  it("successfully creates workout with title and exercise", async () => {
    const { getByText, getByPlaceholderText } = render(<WorkoutCreateScreen />);
    fireEvent.changeText(
      getByPlaceholderText("Untitled Workout\nE.G Chest Day"),
      "Test Workout"
    );
    fireEvent.press(getByText("ADD EXCERCISES TO WORKOUT"));
    // Simulate adding an exercise here if needed
    fireEvent.press(getByText("CREATE"));
    await waitFor(() => {
      expect(createWorkout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.TRAINING);
    });
  });
});
