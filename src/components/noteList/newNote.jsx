import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { addNote } from 'actions/noteActions';

export function NewTodo({ totalCount, addNote }) {
	const history = useHistory();

	useEffect(() => {
		const payload = { title: `Untitled ${totalCount + 1}`, notes: '' };
		addNote(payload, note => history.replace(`/notes/${note.id}`));
	}, [ addNote, totalCount, history ]);

	return null;
}

const mapStateToProps = state => ({ totalCount: state.notes.length });

const mapDispatchToProps = { addNote };

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);
