import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { workoutApi } from "../services/workoutService";
import { Workout } from "../types/workout";
import { WorkoutList } from "../components/WorkoutList";
import { WorkoutForm } from "../components/WorkoutForm";

export const WorkoutsScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  //Fetches all workouts from the API
  const loadWorkouts = async () => {
    try {
      const data = await workoutApi.getAll();
      setWorkouts(data);
    } catch (error) {
      console.error("Error loading workouts:", error);
    }
  };

  // Keyboard interaction with the bottom sheet
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener("keyboardDidShow", () => {
      bottomSheetRef.current?.snapToIndex(1);
    });

    const keyboardWillHide = Keyboard.addListener("keyboardDidHide", () => {
      bottomSheetRef.current?.snapToIndex(-1);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, []);

  //Add new workout
  const handleAddWorkout = async (workout: Omit<Workout, "id">) => {
    try {
      await workoutApi.create(workout);
      loadWorkouts();
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  //Edit existing workout
  const handleEditWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    bottomSheetRef.current?.snapToIndex(0);
  };

  //Update existing workout
  const handleUpdateWorkout = async (workout: Workout) => {
    try {
      if (editingWorkout?.id) {
        await workoutApi.update(editingWorkout.id, workout);
        loadWorkouts();
        setEditingWorkout(null);
        bottomSheetRef.current?.close();
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  //Delete existing workout
  const handleDeleteWorkout = async (id: number) => {
    try {
      await workoutApi.delete(id);
      loadWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  //Bottom sheet handlers
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // Opens the bottom sheet and resets the editing workout
  const openBottomSheet = useCallback(() => {
    setEditingWorkout(null);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  // Closes the bottom sheet and resets the editing workout
  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setEditingWorkout(null);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Workouts</Text>
          <WorkoutList
            workouts={workouts}
            onModify={handleEditWorkout}
            onDelete={handleDeleteWorkout}
          />
          <TouchableOpacity style={styles.fab} onPress={openBottomSheet}>
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            android_keyboardInputMode="adjustResize"
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetIndicator}
          >
            <BottomSheetView style={styles.bottomSheetContent}>
              <WorkoutForm
                onSubmit={
                  editingWorkout ? handleUpdateWorkout : handleAddWorkout
                }
                initialWorkout={editingWorkout}
                onCancel={closeBottomSheet}
              />
            </BottomSheetView>
          </BottomSheet>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  safeArea: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    position: "relative",
    paddingTop: 16,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  bottomSheetIndicator: {
    backgroundColor: "#A3A3A3",
    width: 40,
  },
});
