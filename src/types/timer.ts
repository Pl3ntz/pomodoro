export type PomodoroState = 'work' | 'shortBreak' | 'longBreak';

export interface TimerSession {
  id: string;
  startTime: Date;
  endTime: Date;
  type: PomodoroState;
  completed: boolean;
}