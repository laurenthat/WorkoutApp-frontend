import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { workoutApi } from "../services/workoutService";
import { Workout } from "../types/workout";
import { WorkoutList } from "../components/WorkoutList";
import { WorkoutForm } from "../components/WorkoutForm";

export const WorkoutsScreen = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const loadWorkouts = async () => {
    try {
      const data = await workoutApi.getAll();
      setWorkouts(data);
    } catch (error) {
      console.error("Error loading workouts:", error);
    }
  };

  // Adding keyboard handling
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

  const handleDeleteWorkout = async (id: number) => {
    try {
      await workoutApi.delete(id);
      loadWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
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
              <WorkoutForm onSubmit={handleAddWorkout} />
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
