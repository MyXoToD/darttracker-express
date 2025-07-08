import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    // TODO: Handle errors globally
    console.log('HANDLE ERROR', error);
  }
}
