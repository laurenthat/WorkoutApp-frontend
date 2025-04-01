export interface Workout {
  id?: number;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  created_at?: Date;
}
