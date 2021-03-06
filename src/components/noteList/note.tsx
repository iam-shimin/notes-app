import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, match } from 'react-router-dom';

import 'styles/note.css';

import NoteContent from './noteContent';
import NotePriority from './notePriority';

import { pushToast } from 'actions/notificationActions';
import { deleteNotes, setNoteField } from 'actions/noteActions';
import { increaseCount } from 'utils/storage';
import { asNumber } from 'utils/primitive';
import { NoteFieldSetter, NoteId } from './noteListTypes';
import { NotesAppState } from 'reducers';
import { toggleEdit } from 'actions/appActions';

interface NoteOwnProps extends Pick<RouteComponentProps, 'history' | 'location'> {
	reqNoteId: NoteId,
	match: match<{id?: string}>
}

interface NoteStateProps {
	notes: NoteI[],
}

interface NoteActionProps {
	setNoteField: NoteFieldSetter,
	deleteNotes(noteIds: NoteId[]): void,
	pushToast(message: string): void,
	toggleEdit(noteId: NoteI['id'] | null): void
}

export type NoteProps = NoteOwnProps & NoteStateProps & NoteActionProps;

export function Note({
	reqNoteId,
	notes,
	match,
	pushToast,
	setNoteField,
	deleteNotes,
	toggleEdit: updateEditingTodoId,
	location,
	history
}: NoteProps) {
	const paramid = reqNoteId || match.params.id;
	// @ts-ignore
	const isNewNote = !!location.isNewNote;
	
	const [noteId, setNoteId] = useState(asNumber(paramid));
	const [disableEdit, setDisableEdit] = useState(!isNewNote);
	const toggleEdit = () => setDisableEdit(state => {
		const isDisableAction = !state;
		if (!isDisableAction) {
			updateEditingTodoId(noteId);
		} else {
			updateEditingTodoId(null);
		}
		return isDisableAction;
	});

	const data = notes.find(note => note.id === noteId);

	function deleteThisNote() {
		if (!window.confirm(`Are you sure you want to delete this note '${data?.title}' ?`))
			return;

		const thisNoteIndex = notes.findIndex(note => note.id === noteId);
		const prevNoteIndex = thisNoteIndex !== 0 && thisNoteIndex - 1;
		const prevNoteId = prevNoteIndex
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
		setDisableEdit(!isNewNote);
	}, [isNewNote, paramid]);

	if (paramid === undefined || !data)
		return null;

	return (
		<>
			<div>
				<button className="todo-controls" onClick={toggleEdit}>
					{disableEdit ? 'Edit' : 'Save'}
				</button>
				<NotePriority
					value={data?.priority || 'low'}
					onChange={({ currentTarget }) =>
						setNoteField(noteId, 'priority', currentTarget.value)
					}
				/>
				<button className="todo-controls" onClick={deleteThisNote}>
					Delete
				</button>
			</div>
			<NoteContent
				noteId={noteId}
				data={data}
				disableEdit={disableEdit}
				autoFocus={isNewNote? 'notes': ''}
			/>
		</>
	);
}

const mapStateToProps = (state: NotesAppState) => ({
	notes: state.notes
});

const mapDispatchToProps = {
	setNoteField,
	deleteNotes,
	pushToast,
	toggleEdit
};
// FIXME: 
//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Note);
