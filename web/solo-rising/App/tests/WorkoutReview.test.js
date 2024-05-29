import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import WorkoutPreviewModal from "../screens/workout/WorkoutPreviewModal";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("WorkoutPreviewModal", () => {
  it("displays workout preview modal with workout information", async () => {
    const mockWorkout = {
      exerciseList: [
        { name: "Exercise 1", primary_muscles: "Biceps" },
        { name: "Exercise 2", primary_muscles: "Triceps" },
      ],
    };

    const { getByText } = render(
      <WorkoutPreviewModal modal={true} onClose={() => {}} workout={mockWorkout} />
    );

    await waitFor(() => {
      expect(getByText("Workout Preview")).toBeDefined();
      expect(getByText("Exercise 1")).toBeDefined();
      expect(getByText("Exercise 2")).toBeDefined();
    });

    fireEvent.press(getByText("Start"));
    const navigation = useNavigation();
  });
});
