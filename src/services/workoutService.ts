import axios from "axios";
import { Workout } from "../types/workout";

const API_URL = "http://192.168.1.151:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const workoutApi = {
  getAll: async () => {
    const response = await api.get<Workout[]>("/workouts");
    return response.data;
  },

  getCount: async () => {
    const response = await api.get<Workout[]>("/workouts");
    return response.data.length;
  },

  getTotalWeight: async () => {
    const response = await api.get<Workout[]>("/workouts");
    return response.data.reduce((total, workout) => {
      return total + workout.sets * workout.reps * workout.weight;
    }, 0);
  },

  create: async (workout: Omit<Workout, "id">) => {
    const response = await api.post<Workout>("/workouts", workout);
    return response.data;
  },

  update: async (id: number, workout: Omit<Workout, "id">) => {
    const response = await api.put<Workout>(`/workouts/${id}`, workout);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/workouts/${id}`);
  },
};
