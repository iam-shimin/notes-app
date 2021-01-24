import { NoteId } from 'components/noteList/noteListTypes';
import { CREATE_NOTE, DELETE_NOTE, SET_NOTE_FIELD } from './noteActionTypes';

export function addNote(note: NoteI, callback: Function) {
	const noteWithId: NoteI = {
		...note,
		id: Date.now() + Math.floor(Math.random() * 500)
	};
	callback(noteWithId);
	const type: typeof CREATE_NOTE = CREATE_NOTE;

	return {
		type,
		payload: noteWithId
	};
}

export function deleteNotes(ids: NoteId[]) {
	const type: typeof DELETE_NOTE = DELETE_NOTE;
	return {
		type,
		payload: ids
	};
}

export function setNoteField(id: NoteId, field: keyof NoteI, value: string) {
	const type: typeof SET_NOTE_FIELD = SET_NOTE_FIELD;
	return {
		type,
		payload: { id, field, value }
	};
}

// TODO: create action to change priority of notes