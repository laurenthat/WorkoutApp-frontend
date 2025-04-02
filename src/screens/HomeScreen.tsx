import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { workoutApi } from "../services/workoutService";
import { Stopwatch } from "../components/StopWatch";
import { ProgressCard } from "../components/ProgressCard";

export const HomeScreen = () => {
  const [workoutCount, setWorkoutCount] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);

  const loadStats = async () => {
    try {
      const [count, weight] = await Promise.all([
        workoutApi.getCount(),
        workoutApi.getTotalWeight(),
      ]);
      setWorkoutCount(count);
      setTotalWeight(weight);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Workout App</Text>
        {/* <Text style={styles.subtitle}>
          Track your workouts and monitor your progress
        </Text> */}
        <Stopwatch />
        <ProgressCard workoutCount={workoutCount} totalWeight={totalWeight} />
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
});
