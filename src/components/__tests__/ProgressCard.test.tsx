import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressCard } from '../ProgressCard';

describe('ProgressCard Component', () => {
  it('renders correctly with workout count and total weight', () => {
    const { getByText } = render(
      <ProgressCard workoutCount={5} totalWeight={250} />
    );

    expect(getByText('Your Progress')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('250')).toBeTruthy();
    expect(getByText('Total Workouts')).toBeTruthy();
      expect(getByText("kg Lifted")).toBeTruthy();
  });

  it('renders with zero values', () => {
    const { getByText, getAllByText } = render(
      <ProgressCard workoutCount={0} totalWeight={0} />
    );

    expect(getByText('Your Progress')).toBeTruthy();
    expect(getAllByText('0')).toHaveLength(2); // Both workout count and weight show 0
    expect(getByText('Total Workouts')).toBeTruthy();
    expect(getByText('kg Lifted')).toBeTruthy();
  });

  it('renders with large numbers formatted correctly', () => {
    const { getByText } = render(
      <ProgressCard workoutCount={100} totalWeight={5000} />
    );

    expect(getByText('Your Progress')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
    expect(getByText('5,000')).toBeTruthy(); // Large numbers are formatted with commas
    expect(getByText('Total Workouts')).toBeTruthy();
    expect(getByText('kg Lifted')).toBeTruthy();
  });
});
