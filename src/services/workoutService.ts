import axios from "axios";
import { Workout } from "../types/workout";

const API_URL = "http://192.168.1.151:3000/api";

export const workoutService = {
  async getAllWorkouts(): Promise<Workout[]> {
    const response = await axios.get(`${API_URL}/workouts`);
    return response.data;
  },

  async createWorkout(workout: Workout): Promise<Workout> {
    const response = await axios.post(`${API_URL}/workouts`, workout);
    return response.data;
  },

  async deleteWorkout(id: number): Promise<void> {
    await axios.delete(`${API_URL}/workouts/${id}`);
  },
};
