import { persistNotes } from 'utils/storage';

export default function persistanceMiddleware(store) {
	return next => action => {
		const res = next(action);
		persistNotes(store.getState().notes);
		return res;
	};
}
