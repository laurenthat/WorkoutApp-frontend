import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Workout } from "../types/workout";

interface Props {
  workouts: Workout[];
  onDelete: (id: number) => void;
  onModify?: (workout: Workout) => void;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const WorkoutList: React.FC<Props> = ({
  workouts,
  onDelete,
  onModify,
}) => {
  const renderItem = ({ item }: { item: Workout }) => (
    <View style={styles.item}>
      <View style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.exercise}>{item.exercise}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Sets</Text>
              <Text style={styles.statValue}>{item.sets}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Reps</Text>
              <Text style={styles.statValue}>{item.reps}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>{item.weight} Kg</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Date</Text>
              <Text style={styles.date}>
                {item.created_at && formatDate(new Date(item.created_at))}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => onModify && item.id && onModify(item)}
            style={styles.iconButton}
          >
            <FontAwesome name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => item.id && onDelete(item.id)}
            style={styles.iconButton}
          >
            <FontAwesome name="trash" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={workouts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString() || ""}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 16,
  },
  listContent: {
    paddingHorizontal: 16, // Add horizontal padding
  },
  item: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#7f7f7f",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainContent: {
    flex: 1,
  },
  exercise: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  date: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
});
