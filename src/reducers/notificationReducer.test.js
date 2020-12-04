import reducer from './notificationReducer';
import { NOTIFICATION_PUSH, NOTIFICATION_DISMISS } from 'actions/notificationTypes';

const dummyId = 123;
const dummyMessage = 'message';
const dummyNotification = { _id: dummyId, message: dummyMessage };

const initState = {
	[NOTIFICATION_DISMISS]: [dummyNotification]
}

const payloads = {
	[NOTIFICATION_PUSH]: dummyMessage,
	[NOTIFICATION_DISMISS]: dummyId
};

describe('Notification reducer', () => {
	test.each([
		[NOTIFICATION_PUSH],
		[NOTIFICATION_DISMISS]
	])('%s action', actionType => {
		let mockedDate;

		if (actionType === NOTIFICATION_PUSH) {
			mockedDate = jest.spyOn(Date, 'now').mockReturnValueOnce(dummyId);
		}

		const state = reducer(initState[actionType], {
			type: actionType,
			payload: payloads[actionType]
		});

		if (actionType === NOTIFICATION_PUSH) {
			mockedDate.mockRestore();
			expect(state).toContainEqual(dummyNotification);
		} else {
			expect(state.length).toBe(0);
		}
	})
})