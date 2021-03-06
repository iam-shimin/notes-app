import { TOGGLE_NOTE_EDIT, AppAction } from "actions/appActionTypes";

const initialState: { noteEditing: null | NoteI['id'] } = { noteEditing: null };

export default function appReducer(state = initialState, action: AppAction) {
	switch (action.type) {
		case TOGGLE_NOTE_EDIT:
			return { ...state, noteEditing: action.payload.noteId };
		default:
			return state;
	}
}