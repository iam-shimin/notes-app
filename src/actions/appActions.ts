import { TOGGLE_NOTE_EDIT } from './appActionTypes';

export function toggleEdit(noteId: NoteI['id']) {
	return {
		type: TOGGLE_NOTE_EDIT,
		payload: { noteId }
	};
}