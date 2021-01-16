import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { addNote } from 'actions/noteActions';

interface NewTodoStateProps {
	totalCount: number
}

interface NewTodoActionProps {
	addNote(note: Pick<NoteI, 'title' | 'notes'>, cb: Function): void
}

type NewTodoProps = NewTodoStateProps & NewTodoActionProps;

export function NewTodo({ totalCount, addNote }: NewTodoProps) {
	const history = useHistory();

	useEffect(() => {
		const payload = { title: `Untitled ${totalCount + 1}`, notes: '' };
		addNote(payload, (note: NoteI) => history.replace(`/notes/${note.id}`));
	}, [ addNote, totalCount, history ]);

	return null;
}
// @ts-ignore
const mapStateToProps = state => ({ totalCount: state.notes.length });

const mapDispatchToProps = { addNote };

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);
