import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateExerciseModal from '../screens/exercise/CreateExerciseModal';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY_MUCLES, TYPES, ROUTES } from '../constants';
import { createCustomExercise } from '../../services/exerciseService';
import { View } from 'react-native';

jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((cb) => {
  cb(18, 113, 357, 50)
});

jest.mock('../../services/exerciseService', () => ({
  createCustomExercise: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  useNavigation: jest.fn(),
}));

global.alert = jest.fn();

describe('CreateExerciseModal', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    jest.clearAllMocks();
  });

  it('should show success message and navigate to exercises list on successful creation', async () => {
    createCustomExercise.mockResolvedValueOnce({});

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CreateExerciseModal visible={true} onClose={jest.fn()} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter Name'), 'New Exercise');
    fireEvent.changeText(getByPlaceholderText('Enter Experience'), 'Beginner');
    fireEvent.changeText(getByPlaceholderText('Enter Force Type'), 'Push');
    fireEvent.changeText(getByPlaceholderText('Enter Mechanics'), 'Isolation');

    fireEvent.press(getByTestId("primary-muscle-dropdown"));
    const choosedMuscle = getByText('Abductors');

    fireEvent.press(getByTestId("type-dropdown"));
    const choosedType = getByText('Strength');

    await waitFor(() => {
      expect(choosedMuscle).toBeDefined();
      expect(choosedType).toBeDefined();
    })
    fireEvent.press(choosedMuscle)
    fireEvent.press(choosedType)

    fireEvent.press(getByText('Create'));

    await waitFor(() => {
      expect(createCustomExercise).toHaveBeenCalled();
    });
  });

  it('should show error message if required fields are missing', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <CreateExerciseModal visible={true} onClose={jest.fn()} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter Name'), 'New Exercise');

    fireEvent.press(getByText('Create'));

    await waitFor(() => {
      expect(createCustomExercise).not.toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('All fields are required.');
    });
  });
});