import {
	NotificationAction,
	NOTIFICATION_PUSH,
	NOTIFICATION_DISMISS
} from 'actions/notificationTypes';

const initialNotifications: NotificationI[] = [];

export default function notificationReducer(
	state = initialNotifications,
	action: NotificationAction
) {
	switch (action.type) {
		case NOTIFICATION_PUSH: {
			const notification = { _id: Date.now(), message: action.payload };
			if (state.length > 5) {
				return state.slice(1).concat(notification);
			}
			return state.concat(notification);
		}

		case NOTIFICATION_DISMISS:
			return state.filter(item => item._id !== action.payload);

		default:
			return state;
	}
}
