import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'shared-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  imports: [NgTemplateOutlet, NgFor],
})
export class NotificationsComponent {
  private readonly _notificationsService = inject(NotificationsService);

  notifications = this._notificationsService.notifications;
  success = this._notificationsService.success;
  info = this._notificationsService.info;
  warning = this._notificationsService.warning;
  error = this._notificationsService.error;
}
