import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WorkoutForm } from "../components/WorkoutForm";
import { WorkoutList } from "../components/WorkoutList";
import { workoutService } from "../services/workoutService";
import { Workout } from "../types/workout";

export const HomeScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await workoutService.getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error loading workouts:", error);
    }
  };

  const handleAddWorkout = async (workout: Workout) => {
    try {
      await workoutService.createWorkout(workout);
      loadWorkouts();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const handleDeleteWorkout = async (id: number) => {
    try {
      await workoutService.deleteWorkout(id);
      loadWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WorkoutForm onSubmit={handleAddWorkout} />
      <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
