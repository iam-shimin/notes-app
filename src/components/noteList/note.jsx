import React, { useState, useEffect } from 'react';

import 'styles/note.css';

import NoteContent from './noteContent';
import { connect } from 'react-redux';

import { pushToast } from 'actions/notificationActions';
import { deleteNotes, setNoteField } from 'actions/noteActions';
import { increaseCount } from 'utils/storage';

export function Note({
	reqNoteId,
	notes,
	match,
	pushToast,
	setNoteField,
	deleteNotes,
	history
}) {
	const paramid = reqNoteId || match.params.id;
	const [noteId, setNoteId] = useState(parseInt(paramid));
	const [disableEdit, setDisableEdit] = useState(true);
	const toggleEdit = () => setDisableEdit(!disableEdit);

	const data = notes.find(note => note.id === noteId);

	function deleteThisNote() {
		const thisNoteIndex = notes.findIndex(note => note.id === noteId);
		const prevNoteIndex = thisNoteIndex !== 0 && thisNoteIndex - 1;
		const prevNoteId = notes[prevNoteIndex]
			? `/${notes[prevNoteIndex].id}`
			: '';

		deleteNotes([noteId]);
		pushToast(`Note ${noteId} deleted`);
		history.push(`/notes${prevNoteId}`);
	}

	useEffect(() => {
		setNoteId(parseInt(paramid));
		if (paramid) {
			increaseCount(paramid);
		}
		setDisableEdit(true);
	}, [paramid]);

	return (
		<>
			<div>
				<button className="todo-controls" onClick={toggleEdit}>
					{disableEdit ? 'Edit' : 'Save'}
				</button>
				<select
					className="todo-controls"
					value={data?.priority || 'low'}
					onChange={({ target }) =>
						setNoteField(noteId, 'priority', target.value)
					}>
					<option value="high">High</option>
					<option value="med">Medium</option>
					<option value="low">Low</option>
				</select>
				<button className="todo-controls" onClick={deleteThisNote}>
					Delete
				</button>
			</div>
			<NoteContent noteId={noteId} data={data} disableEdit={disableEdit} />
		</>
	);
}

const mapStateToProps = state => ({
	notes: state.notes,
	notifications: state.notifications
});

const mapDispatchToProps = {
	setNoteField,
	deleteNotes,
	pushToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
