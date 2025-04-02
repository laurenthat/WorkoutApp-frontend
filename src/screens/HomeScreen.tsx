import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { workoutApi } from "../services/workoutService";

export const HomeScreen = () => {
  const [workoutCount, setWorkoutCount] = useState<number>(0);

  useEffect(() => {
    const loadWorkoutCount = async () => {
      try {
        const count = await workoutApi.getCount();
        setWorkoutCount(count);
      } catch (error) {
        console.error("Error loading workout count:", error);
      }
    };

    loadWorkoutCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Workout App</Text>
        <Text style={styles.subtitle}>
          Track your workouts and monitor your progress
        </Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <Text style={styles.statsNumber}>{workoutCount}</Text>
          <Text style={styles.statsLabel}>Total Workouts</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  statsContainer: {
    marginTop: 48,
    alignItems: "center",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  statsNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 16,
    color: "#666",
  },
});
