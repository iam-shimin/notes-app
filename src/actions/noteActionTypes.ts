import {
	addNote,
	deleteNotes,
	setNoteField
} from './noteActions';

export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_NOTE_FIELD = 'SET_NOTE_FIELD';
export const _MIGRATE = 'MIGRATE_STORAGE';

export type NoteAction = ReturnType<typeof addNote>
	| ReturnType<typeof deleteNotes>
	| ReturnType<typeof setNoteField>
	| { type: typeof _MIGRATE };
