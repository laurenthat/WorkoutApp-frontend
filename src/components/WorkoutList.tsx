import React from "react";
import { FlatList, ToastAndroid } from "react-native";
import styled from "styled-components/native";
import { Workout } from "../types/workout";
import { WorkoutListItem } from "./WorkoutListItem";

interface Props {
  workouts: Workout[];
  onDelete: (id: number) => void;
  onModify?: (workout: Workout) => void;
}

const StyledFlatList = styled.FlatList`
  flex: 1;
  padding-top: 16px;
` as unknown as typeof FlatList;

const listContentStyle = {
  paddingHorizontal: 16,
};

export const WorkoutList: React.FC<Props> = ({
  workouts,
  onDelete,
  onModify,
}) => {
  const handleDelete = (workout: Workout) => {
    if (workout.id) {
      onDelete(workout.id);
      ToastAndroid.showWithGravity(
        `${workout.exercise} has been removed`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <StyledFlatList
      data={workouts}
      renderItem={({ item }) => (
        <WorkoutListItem
          workout={item}
          onModify={onModify}
          onDelete={handleDelete}
        />
      )}
      keyExtractor={(item) => item.id?.toString() || ""}
      contentContainerStyle={listContentStyle}
    />
  );
};
