import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import WorkoutsScreen from '../screens/trainingTabs/WorkoutsScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getWorkouts } from '../../services/workoutService';
import { ROUTES } from "../constants";

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock('../../services/workoutService', () => ({
  getWorkouts: jest.fn(),
  deleteWorkout: jest.fn(),
}));

jest.mock('react-native-actionsheet', () => {
  const React = require('react');
  const mockActionSheet = {
    show: jest.fn(),
  };

  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => {
      React.useImperativeHandle(ref, () => mockActionSheet);
      return null;
    }),
  };
});

jest.mock('../screens/workout/WorkoutPreviewModal', () => (props) => (
  <mock-WorkoutPreviewModal {...props} />
));

describe('WorkoutsScreen', () => {
  // const mockNavigate = jest.fn();
  // const mockWorkouts = [
  //   { id: 1, title: 'Workout 1' },
  //   { id: 2, title: 'Workout 2' },
  // ];

  // beforeEach(() => {
  //   useNavigation.mockReturnValue({ navigate: mockNavigate });
  //   useIsFocused.mockReturnValue(true);
  //   getWorkouts.mockResolvedValue(mockWorkouts);
  //   jest.clearAllMocks();
  // });

  it('should display the list of workouts for a logged-in user', async () => {
  //   const { getByText, getByTestId } = render(<WorkoutsScreen />);

  //   await waitFor(() => {
  //     expect(getWorkouts).toHaveBeenCalled();
  //     expect(getByText('Workout 1')).toBeTruthy();
  //     expect(getByText('Workout 2')).toBeTruthy();
  //   });
  // });

  // it('should navigate to create workout screen when the add button is pressed', async () => {
  //   const { getByTestId } = render(<WorkoutsScreen />);

  //   const addButton = getByTestId('add-workout-button');
  //   fireEvent.press(addButton);

  //   expect(mockNavigate).toHaveBeenCalledWith(ROUTES.WORKOUT_CREATE);
  });
});
