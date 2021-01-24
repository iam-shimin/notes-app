import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, match } from 'react-router-dom';

import 'styles/note.css';

import NoteContent from './noteContent';

import { pushToast } from 'actions/notificationActions';
import { deleteNotes, setNoteField } from 'actions/noteActions';
import { increaseCount } from 'utils/storage';
import { asNumber } from 'utils/primitive';
import { NoteFieldSetter, NoteId } from './noteListTypes';
import { NotesAppState } from 'reducers';

interface NoteOwnProps extends Pick<RouteComponentProps, 'history'> {
	reqNoteId: NoteId,
	match: match<{id?: string}>
}

interface NoteStateProps {
	notes: NoteI[],
}

interface NoteActionProps {
	setNoteField: NoteFieldSetter,
	deleteNotes(noteIds: NoteId[]): void,
	pushToast(message: string): void
}

export type NoteProps = NoteOwnProps & NoteStateProps & NoteActionProps;

export function Note({
	reqNoteId,
	notes,
	match,
	pushToast,
	setNoteField,
	deleteNotes,
	history
}: NoteProps) {
	const paramid = reqNoteId || match.params.id;
	
	const [noteId, setNoteId] = useState(asNumber(paramid));
	const [disableEdit, setDisableEdit] = useState(true);
	const toggleEdit = () => setDisableEdit(!disableEdit);

	const data = notes.find(note => note.id === noteId);

	function deleteThisNote() {
		const thisNoteIndex = notes.findIndex(note => note.id === noteId);
		const prevNoteIndex = (thisNoteIndex !== 0 && thisNoteIndex - 1) || 0;
		const prevNoteId = notes[prevNoteIndex]
			? `/${notes[prevNoteIndex].id}`
			: '';

		deleteNotes([noteId]);
		pushToast(`Note ${noteId} deleted`);
		history.push(`/notes${prevNoteId}`);
	}

	useEffect(() => {
		const id = asNumber(paramid);
		setNoteId(id);
		if (paramid) {
			increaseCount(id);
		}
		setDisableEdit(true);
	}, [paramid]);

	if (paramid === undefined || !data)
		return null;

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

const mapStateToProps = (state: NotesAppState) => ({
	notes: state.notes
});

const mapDispatchToProps = {
	setNoteField,
	deleteNotes,
	pushToast
};
// FIXME: 
//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Note);
