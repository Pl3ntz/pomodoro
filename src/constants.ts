import { PomodoroState } from './types/timer';

export const POMODORO_STATES = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
} as const;

export const DEFAULT_TIMES: Record<PomodoroState, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const STATE_LABELS: Record<PomodoroState, string> = {
  work: 'Foco',
  shortBreak: 'Pausa Curta',
  longBreak: 'Pausa Longa',
};