import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ExcercisesScreen from '../screens/trainingTabs/ExcercisesScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAllExercises, getExercisesByName } from '../../services/exerciseService';
import { ROUTES } from '../constants';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

jest.mock('../../services/exerciseService', () => ({
  getAllExercises: jest.fn(),
  getExercisesByName: jest.fn(),
}));

jest.mock('../screens/exercise/CreateExerciseModal', () => (props) => (
  <mock-CreateExerciseModal {...props} />
));

describe('ExcercisesScreen', () => {
  const mockNavigate = jest.fn();
  const mockExercises = [
    { id: 1, name: 'Exercise 1' },
    { id: 2, name: 'Exercise 2' },
  ];

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useIsFocused.mockReturnValue(true);
    getAllExercises.mockResolvedValue(mockExercises);
    getExercisesByName.mockResolvedValue(mockExercises);
    jest.clearAllMocks();
  });

  it('should display the list of exercises for a logged-in user', async () => {
    const { getByText, getByPlaceholderText } = render(<ExcercisesScreen />);

    await waitFor(() => {
      expect(getAllExercises).toHaveBeenCalled();
      expect(getByText('Exercise 1')).toBeTruthy();
      expect(getByText('Exercise 2')).toBeTruthy();
    });

    const searchInput = getByPlaceholderText('Freesearch');
    fireEvent.changeText(searchInput, 'Exercise');

    await waitFor(() => {
      expect(getExercisesByName).toHaveBeenCalledWith('Exercise');
      expect(getByText('Exercise 1')).toBeTruthy();
      expect(getByText('Exercise 2')).toBeTruthy();
    });
  });

  it('should navigate to exercise view screen when an exercise item is pressed', async () => {
    const { getByText } = render(<ExcercisesScreen />);

    await waitFor(() => {
      expect(getByText('Exercise 1')).toBeTruthy();
    });

    const exerciseItem = getByText('Exercise 1');
    fireEvent.press(exerciseItem);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.EXERCISE_VIEW, { exercise: { id: 1, name: 'Exercise 1' } });
  });

  it('should show the create exercise modal when the add button is pressed', async () => {
    const { getByTestId, getByText } = render(<ExcercisesScreen />);

    await waitFor(() => {
      expect(getByText('Exercise 1')).toBeTruthy();
    });

    const addButton = getByTestId('add-exercise-button');
    fireEvent.press(addButton);

    const modal = getByTestId('create-exercise-modal');
    expect(modal).toBeTruthy();
  });
});
