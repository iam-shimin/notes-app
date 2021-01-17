import { CREATE_NOTE, DELETE_NOTE, SET_NOTE_FIELD, _MIGRATE, NoteAction } from 'actions/noteActionTypes';
import { loadNotes } from 'utils/storage';

const initialNotes = loadNotes();


export default function noteReducer(state = initialNotes, action: NoteAction) {
	switch (action.type) {
		case CREATE_NOTE:
			return [...state, action.payload];

		case DELETE_NOTE:
			return state.filter(note => !action.payload.includes(note.id));

		case SET_NOTE_FIELD:
			const { id, field, value } = action.payload;
			return state.map(note => {
				if (note.id === id) {
					return { ...note, [field]: value };
				}
				return note;
			});
		
		case _MIGRATE:
			return loadNotes();

		default:
			return state;
	}
}
