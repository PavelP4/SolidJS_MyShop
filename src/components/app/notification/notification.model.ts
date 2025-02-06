export class NotificationModel {
  type?: NotificationType;
  message?: string;
}

export enum NotificationType {
  Info = 1,
  Warn = 2,
  Error = 3
}