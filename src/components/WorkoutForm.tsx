import React, { useState } from "react";
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
}

export const WorkoutForm: React.FC<Props> = ({ onSubmit }) => {
  const [workout, setWorkout] = useState<Workout>({
    exercise: "",
    sets: 0,
    reps: 0,
    weight: 0,
  });

  const handleSubmit = () => {
    onSubmit(workout);
    setWorkout({ exercise: "", sets: 0, reps: 0, weight: 0 });
  };

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
        value={workout.sets.toString()}
        onChangeText={(text) => setWorkout({ ...workout, sets: Number(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={workout.reps.toString()}
        onChangeText={(text) => setWorkout({ ...workout, reps: Number(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (lbs)"
        value={workout.weight.toString()}
        onChangeText={(text) =>
          setWorkout({ ...workout, weight: Number(text) })
        }
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
