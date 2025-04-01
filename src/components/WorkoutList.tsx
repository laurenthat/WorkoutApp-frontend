import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Workout } from "../types/workout";

interface Props {
  workouts: Workout[];
  onDelete: (id: number) => void;
}

export const WorkoutList: React.FC<Props> = ({ workouts, onDelete }) => {
  const renderItem = ({ item }: { item: Workout }) => (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.exercise}>{item.exercise}</Text>
        <Text style={styles.details}>
          {item.sets} sets × {item.reps} reps @ {item.weight} lbs
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => item.id && onDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={workouts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString() || ""}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
    backgroundColor: "white",
  },
  info: {
    flex: 1,
  },
  exercise: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    color: "#666",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
  },
});
