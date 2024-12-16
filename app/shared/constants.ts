export const POMODORO_STATES = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
} as const;

export const DEFAULT_TIMES = {
  [POMODORO_STATES.WORK]: 25 * 60, // 25 minutes in seconds
  [POMODORO_STATES.SHORT_BREAK]: 5 * 60, // 5 minutes
  [POMODORO_STATES.LONG_BREAK]: 15 * 60, // 15 minutes
};

export const STATE_LABELS = {
  [POMODORO_STATES.WORK]: 'Foco',
  [POMODORO_STATES.SHORT_BREAK]: 'Pausa Curta',
  [POMODORO_STATES.LONG_BREAK]: 'Pausa Longa',
};