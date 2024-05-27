import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutHistoryScreen from "../screens/workout/WorkoutHistoryScreen";
import { getTrainings } from "../../services/trainingService";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  }),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../../services/trainingService", () => ({
  getTrainings: jest.fn().mockResolvedValue([
    {
      id: "1",
      date: { seconds: 1621609200 },
      title: "Workout 1",
      volume: 50,
    },
    {
      id: "2",
      date: { seconds: 1621695600 },
      title: "Workout 2",
      volume: 60,
    },
  ]),
}));

describe("WorkoutHistoryScreen", () => {
  it("displays workout history and opens workout modal with correct date format", async () => {
    const { getByText, getByTestId } = render(<WorkoutHistoryScreen />);

    expect(getByText("My Workouts")).toBeDefined();

    // Wait for getTrainings to resolve and render the screen
    await waitFor(async () => {
      const trainings = await getTrainings();
      trainings.forEach((training) => {
        expect(getByText(training.title)).toBeDefined();
      });
    });

    fireEvent.press(getByText("Workout 1"));

    await waitFor(() => {
      expect(getByText("2021-05-22")).toBeDefined();
    });
  });
});
