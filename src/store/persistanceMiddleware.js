import { persistTodos } from 'utils/storage';

export default function persistanceMiddleware(store) {
	return next => action => {
		const res = next(action);
		persistTodos(store.getState().todos);
		return res;
	};
}
