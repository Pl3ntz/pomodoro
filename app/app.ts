import { Application } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';

// Initialize Local Notifications
LocalNotifications.init();

Application.run({ moduleName: 'app-root' });