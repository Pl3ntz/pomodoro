import { useState, useEffect, useCallback, useRef } from 'react';
import { POMODORO_STATES, DEFAULT_TIMES, STATE_LABELS } from '../constants';
import { TimerSession, PomodoroState } from '../types/timer';

export function useTimer() {
  const [currentState, setCurrentState] = useState<PomodoroState>(POMODORO_STATES.WORK);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIMES[currentState]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [sessions, setSessions] = useState<TimerSession[]>([]);
  const timerRef = useRef<number>();
  const currentSessionRef = useRef<TimerSession | null>(null);

  const showNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const startNewSession = useCallback(() => {
    currentSessionRef.current = {
      id: Date.now().toString(),
      startTime: new Date(),
      endTime: new Date(),
      type: currentState,
      completed: false,
    };
  }, [currentState]);

  const completeCurrentSession = useCallback((completed: boolean) => {
    if (currentSessionRef.current) {
      const session = {
        ...currentSessionRef.current,
        endTime: new Date(),
        completed,
      };
      setSessions(prev => [session, ...prev].slice(0, 10));
      currentSessionRef.current = null;
    }
  }, []);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    completeCurrentSession(true);
    
    if (currentState === POMODORO_STATES.WORK) {
      setCompletedPomodoros(prev => {
        const newCount = prev + 1;
        if (newCount % 4 === 0) {
          setCurrentState('longBreak');
          showNotification('Pausa Longa!', 'Hora de uma pausa mais longa. Você completou 4 pomodoros!');
        } else {
          setCurrentState('shortBreak');
          showNotification('Pausa!', 'Hora de uma pausa curta!');
        }
        return newCount;
      });
    } else {
      setCurrentState('work');
      showNotification('Voltar ao Trabalho!', 'Hora de focar novamente!');
    }
  }, [currentState, showNotification, completeCurrentSession]);

  useEffect(() => {
    setTimeRemaining(DEFAULT_TIMES[currentState]);
  }, [currentState]);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      if (!currentSessionRef.current) {
        startNewSession();
      }
      timerRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, handleTimerComplete, startNewSession]);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    if (currentSessionRef.current) {
      completeCurrentSession(false);
    }
    setIsRunning(false);
    setTimeRemaining(DEFAULT_TIMES[currentState]);
  }, [currentState, completeCurrentSession]);

  return {
    timeRemaining,
    isRunning,
    currentState: STATE_LABELS[currentState],
    completedPomodoros,
    progressPercentage: ((DEFAULT_TIMES[currentState] - timeRemaining) / DEFAULT_TIMES[currentState]) * 100,
    sessions,
    toggleTimer,
    resetTimer
  };
}