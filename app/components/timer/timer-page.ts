import { EventData, Page } from '@nativescript/core';
import { TimerViewModel } from './timer-view-model';
import { formatTime } from '../../shared/utils/timer';

let viewModel: TimerViewModel;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  viewModel = new TimerViewModel();
  
  // Add computed property for formatted time
  Object.defineProperty(viewModel, 'formattedTime', {
    get: function() {
      return formatTime(this.timeRemaining);
    }
  });
  
  page.bindingContext = viewModel;
}