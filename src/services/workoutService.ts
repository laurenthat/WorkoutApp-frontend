import axios from "axios";
import { Workout } from "../types/workout";
import { Platform } from "react-native";

const API_URL = Platform.select({
  android: "http://10.0.2.2:3000/api",
  ios: "http://192.168.1.151:3000/api",
  default: "http://192.168.1.151:3000/api",
});

// const API_URL = "http://192.168.1.151:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Workout API service
export const workoutApi = {
  // Fetches all workouts from the API
  getAll: async () => {
    const response = await api.get<Workout[]>("/workouts");
    return response.data;
  },
  // Fetches the total number of workouts from the API
  getCount: async () => {
    const response = await api.get<Workout[]>("/workouts");
    return response.data.length;
  },
  // Fetches the total weight lifted from all workouts
  getTotalWeight: async () => {
    const response = await api.get<Workout[]>("/workouts");
    return response.data.reduce((total, workout) => {
      return total + workout.sets * workout.reps * workout.weight;
    }, 0);
  },
  // Creates a new workout
  create: async (workout: Omit<Workout, "id">) => {
    const response = await api.post<Workout>("/workouts", workout);
    return response.data;
  },
  // Updates an existing workout
  update: async (id: number, workout: Omit<Workout, "id">) => {
    const response = await api.put<Workout>(`/workouts/${id}`, workout);
    return response.data;
  },
  // Deletes a workout
  delete: async (id: number) => {
    await api.delete(`/workouts/${id}`);
  },
};
