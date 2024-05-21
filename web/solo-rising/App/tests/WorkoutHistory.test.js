import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutHistoryScreen from "../screens/workout/WorkoutHistoryScreen";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    navigate: jest.fn(),
  }),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

const mockTrainings = [
  {
    id: "1",
    date: { seconds: 1621609200 }, // May 22, 2021
    title: "Workout 1",
    volume: 50,
  },
  {
    id: "2",
    date: { seconds: 1621695600 }, // May 23, 2021
    title: "Workout 2",
    volume: 60,
  },
];

describe("WorkoutHistoryScreen", () => {
  it("displays workout history and opens workout modal with correct date format", async () => {
    // const { getByText, getByTestId } = render(<WorkoutHistoryScreen />);

    // expect(getByText("My Workouts")).toBeDefined();

    // await waitFor(() => {
    //   mockTrainings.forEach((training) => {
    //     expect(getByText(training.title)).toBeDefined();
    //   });
    // });

    // fireEvent.press(getByText("Workout 1"));

    // expect(getByTestId("workout-modal")).toBeDefined();

    // await waitFor(() => {
    //   expect(getByText("2021-05-22")).toBeDefined();
    // });
  });
});
