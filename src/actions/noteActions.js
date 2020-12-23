import { CREATE_NOTE, DELETE_NOTE, SET_NOTE_FIELD } from './noteActionTypes';

export function addNote(note, callback) {
	const noteWithId = {
		...note,
		id: Date.now() + Math.floor(Math.random() * 500)
	};
	callback(noteWithId);

	return {
		type: CREATE_NOTE,
		payload: noteWithId
	};
}

export function deleteNotes(ids) {
	return {
		type: DELETE_NOTE,
		payload: ids
	};
}

export function setNoteField(id, field, value) {
	return {
		type: SET_NOTE_FIELD,
		payload: { id, field, value }
	};
}