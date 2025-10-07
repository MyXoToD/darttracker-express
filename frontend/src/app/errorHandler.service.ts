import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationsService } from './shared/notifications/services/notifications.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {
  private readonly _notificationsService = inject(NotificationsService);

  handleError(error: Error): void {
    // TODO: Handle errors globally
    console.log('HANDLE ERROR', error.message);
    this._notificationsService.addErrorNotification(error.message);
  }
}
