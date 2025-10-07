import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { NotificationMessage } from '../models/notification-message.interface';
import { NotificationType } from '../models/notification-type.enum';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly _notifications = signal<NotificationMessage[]>([]);
  private readonly _router = inject(Router);
  private readonly _autoRemoveDelay = 5000;

  notifications = computed(() => this._notifications());
  success = computed(() =>
    this._notifications().filter(
      (notification) => notification.type === NotificationType.SUCCESS,
    ),
  );
  info = computed(() =>
    this._notifications().filter(
      (notification) => notification.type === NotificationType.INFO,
    ),
  );
  warning = computed(() =>
    this._notifications().filter(
      (notification) => notification.type === NotificationType.WARNING,
    ),
  );
  error = computed(() =>
    this._notifications().filter(
      (notification) => notification.type === NotificationType.ERROR,
    ),
  );

  constructor() {
    // Reset notifications on router navigation
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap(() => this.clearAll()),
      )
      .subscribe();
  }

  addNotification(
    notification: NotificationMessage,
    autoRemove = true,
    autoRemoveDelay = this._autoRemoveDelay,
  ) {
    const id = crypto.randomUUID();
    notification.id = id;
    this._notifications.set([...this._notifications(), notification]);

    if (autoRemove) {
      setTimeout(() => {
        this._notifications.update((notifications) =>
          notifications.filter((n) => n.id !== id),
        );
      }, autoRemoveDelay);
    }
  }
  addNotifications(notifications: NotificationMessage[]) {
    notifications.forEach((notification) => this.addNotification(notification));
  }

  addSuccessNotification(message: string) {
    this.addNotification({
      type: NotificationType.SUCCESS,
      message: message,
    });
  }
  addSuccessNotifications(messages: string[]) {
    messages.forEach((message) => this.addSuccessNotification(message));
  }

  addInfoNotification(message: string) {
    this.addNotification({
      type: NotificationType.INFO,
      message: message,
    });
  }
  addInfoNotifications(messages: string[]) {
    messages.forEach((message) => this.addInfoNotification(message));
  }

  addWarningNotification(message: string) {
    this.addNotification({
      type: NotificationType.WARNING,
      message: message,
    });
  }
  addWarningNotifications(messages: string[]) {
    messages.forEach((message) => this.addWarningNotification(message));
  }

  addErrorNotification(message: string) {
    this.addNotification({
      type: NotificationType.ERROR,
      message: message,
    });
  }
  addErrorNotifications(messages: string[]) {
    messages.forEach((message) => this.addErrorNotification(message));
  }

  clearAll() {
    this._notifications.set([]);
  }

  clearByType(type: NotificationType) {
    this._notifications.set([
      ...this._notifications().filter(
        (notification) => notification.type !== type,
      ),
    ]);
  }
}
