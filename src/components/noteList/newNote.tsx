import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { addNote } from 'actions/noteActions';
import { NotesAppState } from 'reducers';

interface NewTodoStateProps {
	totalCount: number,
	location: any
}

interface NewTodoActionProps {
	addNote(note: Pick<NoteI, 'title' | 'notes'>, cb: Function): void
}

type NewTodoProps = NewTodoStateProps & NewTodoActionProps;

export function NewTodo({ totalCount, addNote, location }: NewTodoProps) {
	const history = useHistory();
	const passedNoteTitle = location?.title;
	const passedCallback = location?.callback;

	useEffect(() => {
		const payload = { title: passedNoteTitle || `Untitled ${totalCount + 1}`, notes: '' };
		addNote(payload, (note: NoteI) => history.replace({
			pathname: `/notes/${note.id}`,
			// @ts-ignore
			isNewNote: true
		}));
		if (typeof passedCallback === 'function') {
			passedCallback();
		}
	}, [ addNote, totalCount, passedNoteTitle, passedCallback, history ]);

	return null;
}

const mapStateToProps = (state: NotesAppState) => ({ totalCount: state.notes.length });

const mapDispatchToProps = { addNote };

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);
