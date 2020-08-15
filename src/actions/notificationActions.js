import {NOTIFICATION_PUSH, NOTIFICATION_DISMISS} from './notificationTypes';

export function pushToast(message) {
	return {
		type: NOTIFICATION_PUSH,
		payload: message
	}
}

export function dismissToast(id) {
	return {
		type: NOTIFICATION_DISMISS,
		payload: id
	}
}