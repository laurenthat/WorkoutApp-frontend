import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { workoutApi } from "../services/workoutService";

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
        <Text style={styles.subtitle}>
          Track your workouts and monitor your progress
        </Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statsNumber}>{workoutCount}</Text>
              <Text style={styles.statsLabel}>Total Workouts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statsNumber}>
                {totalWeight.toLocaleString()}
              </Text>
              <Text style={styles.statsLabel}>kg Lifted</Text>
            </View>
          </View>
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
  statsGrid: {
    marginTop: 48,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
  },
  statsContainer: {
    marginTop: 48,
    width: "100%",
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
    marginBottom: 24,
    color: "#1a1a1a",
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E5E5E5",
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
