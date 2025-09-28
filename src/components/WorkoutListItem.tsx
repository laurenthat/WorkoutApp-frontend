import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Workout } from '../types/workout';
import styled from 'styled-components/native';

interface WorkoutListItemProps {
  workout: Workout;
  onModify?: (workout: Workout) => void;
  onDelete: (workout: Workout) => void;
}

// Styled components
const ItemContainer = styled.View`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: white;
  shadow-color: #7f7f7f;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MainContent = styled.View`
  flex: 1;
`;

const ExerciseTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  gap: 24px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const StatValue = styled.Text`
  font-size: 13px;
  font-weight: 600;
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
`;

const IconButton = styled.TouchableOpacity`
  padding: 4px;
`;

//Date formatting function to display the date in a readable format
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const WorkoutListItem: React.FC<WorkoutListItemProps> = ({
  workout,
  onModify,
  onDelete,
}) => {
  return (
    <ItemContainer>
      <ContentContainer>
        <MainContent>
          <ExerciseTitle>{workout.exercise}</ExerciseTitle>
          <StatsContainer>
            <StatItem>
              <StatLabel>Sets</StatLabel>
              <StatValue>{workout.sets}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Reps</StatLabel>
              <StatValue>{workout.reps}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Weight</StatLabel>
              <StatValue>{workout.weight} Kg</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Date</StatLabel>
              <StatValue>
                {workout.created_at && formatDate(new Date(workout.created_at))}
              </StatValue>
            </StatItem>
          </StatsContainer>
        </MainContent>
        <ActionsContainer>
          <IconButton
            onPress={() => onModify && workout.id && onModify(workout)}
          >
            <FontAwesome name="edit" size={20} color="#007AFF" />
          </IconButton>
          <IconButton onPress={() => onDelete(workout)}>
            <FontAwesome name="trash" size={20} color="#FF3B30" />
          </IconButton>
        </ActionsContainer>
      </ContentContainer>
    </ItemContainer>
  );
};
