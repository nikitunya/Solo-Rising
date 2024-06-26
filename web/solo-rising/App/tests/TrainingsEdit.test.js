import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutEditScreen from "../screens/workout/WorkoutEditScreen";
import { updateWorkout } from "../../services/workoutService";
import { useIsFocused, useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock("../screens/api/muscleGroupApi", () => ({
  fetchImage: jest.fn(),
}));

jest.mock("../../services/workoutService", () => ({
  updateWorkout: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  useNavigation: jest.fn(),
}));

describe("WorkoutEditScreen", () => {
  it("updates workout title", async () => {
    // const mockWorkout = {
    //   id: "mockWorkoutId",
    //   title: "Mock Workout",
    //   exerciseList: [],
    // };
    // const { getByPlaceholderText, getByText } = render(
    //   <WorkoutEditScreen route={{ params: mockWorkout }} />
    // );

    // const updatedTitle = "Updated Workout";
    // fireEvent.changeText(
    //   getByPlaceholderText("Untitled Workout\nE.G Chest Day"),
    //   updatedTitle
    // );
    // fireEvent.press(getByText("UPDATE"));

    // await waitFor(() => {
    //   expect(updateWorkout).toHaveBeenCalledWith("mockWorkoutId", {
    //     title: updatedTitle,
    //     exerciseList: [],
    //   });
    // });
  });

  it("removes exercise from workout", async () => {
    // const mockWorkout = {
    //   id: "mockWorkoutId",
    //   title: "Mock Workout",
    //   exerciseList: [{ name: "Mock Exercise 1" }, { name: "Mock Exercise 2" }],
    // };
    // const { getByText, queryByText } = render(
    //   <WorkoutEditScreen route={{ params: mockWorkout }} />
    // );

    // fireEvent.press(getByText("Mock Exercise 1"));
    // fireEvent.press(getByText("close"));

    // fireEvent.press(getByText("UPDATE"));

    // await waitFor(() => {
    //   expect(updateWorkout).toHaveBeenCalledWith("mockWorkoutId", {
    //     title: "Mock Workout",
    //     exerciseList: [{ name: "Mock Exercise 2" }],
    //   });
    // });
    // expect(queryByText("Mock Exercise 1")).toBeNull();
  });
});
