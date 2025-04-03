import React, { useState, useMemo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Workout } from "../types/workout";

interface Props {
  onSubmit: (workout: Workout) => void;
  initialWorkout?: Workout | null;
  onCancel?: () => void;
}

// Handles the form for adding and editing workouts
export const WorkoutForm: React.FC<Props> = ({
  onSubmit,
  initialWorkout = null,
  onCancel,
}) => {
  const [workout, setWorkout] = useState<Workout>(() => {
    if (initialWorkout) {
      return { ...initialWorkout };
    }
    return {
      exercise: "",
      sets: 0,
      reps: 0,
      weight: 0,
    };
  });

  const isFormValid = useMemo(() => {
    return (
      //Checking if all fields are filled
      workout.exercise.trim() !== "" &&
      workout.sets > 0 &&
      workout.reps > 0 &&
      workout.weight > 0
    );
  }, [workout]);

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(workout);
      setWorkout({ exercise: "", sets: 0, reps: 0, weight: 0 });
    }
  };

  const handleCancel = () => {
    // Reset form when canceling
    setWorkout({
      exercise: "",
      sets: 0,
      reps: 0,
      weight: 0,
    });
    onCancel?.();
  };

  // Using useEffect to show the workout data in the bottom sheet when editing
  React.useEffect(() => {
    if (initialWorkout) {
      setWorkout(initialWorkout);
    }
  }, [initialWorkout]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Exercise"
        value={workout.exercise}
        onChangeText={(text) => setWorkout({ ...workout, exercise: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sets"
        value={workout.sets === 0 ? "" : workout.sets.toString()}
        onChangeText={(text) => setWorkout({ ...workout, sets: Number(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={workout.reps === 0 ? "" : workout.reps.toString()}
        onChangeText={(text) => setWorkout({ ...workout, reps: Number(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={workout.weight === 0 ? "" : workout.weight.toString()}
        onChangeText={(text) =>
          setWorkout({ ...workout, weight: Number(text) })
        }
        keyboardType="numeric"
      />

      {initialWorkout ? (
        // If editing, show both Update and Cancel buttons
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              !isFormValid && styles.buttonDisabled,
              styles.buttonWithCancel,
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // If not editing, show only the Add Workout button
        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Add Workout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#A3A3A3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  buttonWithCancel: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#007AFF",
  },
});
