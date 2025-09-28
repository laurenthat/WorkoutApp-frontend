// CI/CD Pipeline Test - Intentional Error for Testing
export interface Workout {
  id?: number;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  created_at?: Date;
  // This will cause a TypeScript error - missing semicolon and invalid syntax
  invalidProperty: ThisTypeDoesNotExist
}
