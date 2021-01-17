import { pushToast, dismissToast } from './notificationActions';
export const NOTIFICATION_PUSH = 'NOTIFICATION_PUSH';
export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS';

export type NotificationAction = ReturnType<typeof pushToast>
	| ReturnType<typeof dismissToast>;
