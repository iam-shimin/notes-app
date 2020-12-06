import middleware from './persistanceMiddleware';

test('persistance middleware', () => {
	const storeApi = {
		getState() {
			return {};
		}
	};
	const action = { type: 'test' };
	const getDispatcher = middleware(storeApi);
	const dispatch = getDispatcher(a => a);
	const dispatchedAction = dispatch(action);

	expect(dispatchedAction).toBe(action);
});
