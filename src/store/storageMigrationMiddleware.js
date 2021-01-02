import { _MIGRATE } from 'actions/noteActionTypes';
import { pushToast } from 'actions/notificationActions';
import { persistNotes } from 'utils/storage';

export default function storageMigrationMiddleware(store) {
	return next => action => {
		next(action);
		replaceTodoIfExists(store.dispatch);
	}

}

function replaceTodoIfExists(dispatch) {
	const oldNotesKey = 'todos';
	const shouldMigrate = oldNotesKey in localStorage;
	if (shouldMigrate) {
		window.isUpdatingApp = true;
		const storedNotes = localStorage.getItem(oldNotesKey);
		localStorage.removeItem(oldNotesKey);
		persistNotes(JSON.parse(storedNotes), 'replaced')
		dispatch(pushToast('App upgraded'));
		dispatch({ type: _MIGRATE });
		window.isUpdatingApp = false;
	}
}