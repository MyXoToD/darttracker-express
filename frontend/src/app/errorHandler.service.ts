import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationsService } from './shared/notifications/services/notifications.service';

interface CustomError extends Error {
  error: string;
}

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {
  private readonly _notificationsService = inject(NotificationsService);

  handleError(error: CustomError): void {
    // TODO: Handle errors globally
    console.log(error);
    console.error(error.stack);
    console.log('HANDLE ERROR', error.message);
    this._notificationsService.addErrorNotification(
      error.error ?? error.message ?? 'An unknown error occurred',
    );
  }
}
