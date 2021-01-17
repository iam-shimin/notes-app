import { Store } from 'redux';
import { persistNotes } from 'utils/storage';

type NextCB = (action: any) => void;
type Action = {
	type: string,
	payload?: any
};

export default function persistanceMiddleware(store: Store) {
	return (next: NextCB) => (action: Action) => {
		const res = next(action);
		//@ts-ignore
		if (!window.isUpdatingApp)
			persistNotes(store.getState().notes);
		
		return res;
	};
}
