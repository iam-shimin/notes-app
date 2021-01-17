import { _MIGRATE } from 'actions/noteActionTypes';
import { pushToast } from 'actions/notificationActions';
import { persistNotes } from 'utils/storage';

export default function storageMigrationMiddleware(store: any) {
	return (next: any) => (action: any) => {
		next(action);
		replaceTodoIfExists(store.dispatch);
	}

}

function replaceTodoIfExists(dispatch: any) {
	const oldNotesKey = 'todos';
	const shouldMigrate = oldNotesKey in localStorage;
	if (shouldMigrate) { // @ts-ignore
		window.isUpdatingApp = true;
		const storedNotes = localStorage.getItem(oldNotesKey);
		localStorage.removeItem(oldNotesKey);
		if (storedNotes)
			persistNotes(JSON.parse(storedNotes))
		dispatch(pushToast('App upgraded'));
		dispatch({ type: _MIGRATE });
		// @ts-ignore
		window.isUpdatingApp = false;
	}
}