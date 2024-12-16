import { Observable, LocalNotifications } from '@nativescript/core';
import { POMODORO_STATES, DEFAULT_TIMES, STATE_LABELS } from '../../shared/constants';

export class TimerViewModel extends Observable {
  private _currentState = POMODORO_STATES.WORK;
  private _timeRemaining = DEFAULT_TIMES[POMODORO_STATES.WORK];
  private _isRunning = false;
  private _timer: number | null = null;
  private _completedPomodoros = 0;

  constructor() {
    super();
    this.requestNotificationPermission();
  }

  get timeRemaining(): number {
    return this._timeRemaining;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  get currentState(): string {
    return STATE_LABELS[this._currentState];
  }

  get completedPomodoros(): number {
    return this._completedPomodoros;
  }

  get progressPercentage(): number {
    return (1 - this._timeRemaining / DEFAULT_TIMES[this._currentState]) * 100;
  }

  private async requestNotificationPermission() {
    try {
      const hasPermission = await LocalNotifications.hasPermission();
      if (!hasPermission) {
        await LocalNotifications.requestPermission();
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
    }
  }

  private showNotification(title: string, body: string) {
    LocalNotifications.schedule([{
      id: 1,
      title,
      body,
      sound: true,
      badge: 1
    }]);
  }

  toggleTimer() {
    if (this._isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (!this._isRunning) {
      this._isRunning = true;
      this.notifyPropertyChange('isRunning', this._isRunning);
      
      this._timer = setInterval(() => {
        this._timeRemaining--;
        this.notifyPropertyChange('timeRemaining', this._timeRemaining);
        this.notifyPropertyChange('progressPercentage', this.progressPercentage);

        if (this._timeRemaining <= 0) {
          this.handleTimerComplete();
        }
      }, 1000);
    }
  }

  pauseTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._isRunning = false;
    this.notifyPropertyChange('isRunning', this._isRunning);
  }

  resetTimer() {
    this.pauseTimer();
    this._timeRemaining = DEFAULT_TIMES[this._currentState];
    this.notifyPropertyChange('timeRemaining', this._timeRemaining);
    this.notifyPropertyChange('progressPercentage', this.progressPercentage);
  }

  private handleTimerComplete() {
    this.pauseTimer();
    
    if (this._currentState === POMODORO_STATES.WORK) {
      this._completedPomodoros++;
      this.notifyPropertyChange('completedPomodoros', this._completedPomodoros);
      
      if (this._completedPomodoros % 4 === 0) {
        this._currentState = POMODORO_STATES.LONG_BREAK;
        this.showNotification('Pausa Longa!', 'Hora de uma pausa mais longa. Você completou 4 pomodoros!');
      } else {
        this._currentState = POMODORO_STATES.SHORT_BREAK;
        this.showNotification('Pausa!', 'Hora de uma pausa curta!');
      }
    } else {
      this._currentState = POMODORO_STATES.WORK;
      this.showNotification('Voltar ao Trabalho!', 'Hora de focar novamente!');
    }
    
    this._timeRemaining = DEFAULT_TIMES[this._currentState];
    this.notifyPropertyChange('currentState', this.currentState);
    this.notifyPropertyChange('timeRemaining', this._timeRemaining);
    this.notifyPropertyChange('progressPercentage', this.progressPercentage);
  }
}