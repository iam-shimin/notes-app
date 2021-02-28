import reducer from './notificationReducer';
import {
	NOTIFICATION_PUSH,
	NOTIFICATION_DISMISS
} from 'actions/notificationTypes';

const dummyId = 123;
const dummyMessage = 'message';
const dummyNotification: NotificationI = { _id: dummyId, message: dummyMessage };

const initState = {
	[NOTIFICATION_DISMISS]: [dummyNotification]
};

const payloads = {
	[NOTIFICATION_DISMISS]: dummyId,
	[NOTIFICATION_PUSH]: dummyMessage
};

type StateKeys = keyof typeof initState;
type PayloadKeys = keyof typeof payloads;

describe('Notification reducer', () => {
	test.each([[NOTIFICATION_PUSH], [NOTIFICATION_DISMISS]])(
		'%s action',
		actionType => {
			let mockedDate;

			if (actionType === NOTIFICATION_PUSH) {
				mockedDate = jest.spyOn(Date, 'now').mockReturnValueOnce(dummyId);
			}

			const state = reducer(initState[actionType as StateKeys], {
				// @ts-ignore
				type: actionType,
				payload: payloads[actionType as PayloadKeys]
			});

			if (actionType === NOTIFICATION_PUSH) {
				mockedDate?.mockRestore();
				expect(state).toContainEqual(dummyNotification);
			} else {
				expect(state.length).toBe(0);
			}
		}
	);
});
