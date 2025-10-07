import { NotificationType } from './notification-type.enum';

export interface NotificationMessage {
  id?: string;
  type: NotificationType;
  message: string;
}
