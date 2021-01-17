import { NOTIFICATION_PUSH, NOTIFICATION_DISMISS } from './notificationTypes';

export function pushToast(message: string) {
	const type: typeof NOTIFICATION_PUSH = NOTIFICATION_PUSH;
	return {
		type,
		payload: message
	};
}

export function dismissToast(id: Id) {
	const type: typeof NOTIFICATION_DISMISS = NOTIFICATION_DISMISS;
	return {
		type,
		payload: id
	};
}