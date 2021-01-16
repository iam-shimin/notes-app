import React from 'react';

import { connect } from 'react-redux';

import { setNoteField } from 'actions/noteActions';
import { NoteFieldSetter, NoteFields, NoteId } from './noteListTypes';

const titlePlaceholder = 'What do you need to do ?';
const textareaPlaceholder = `Write notes on:
 * How to achieve the goal
 * Deadlines
 * Who is going to help ?`;

interface NoteContentOwnProps {
	noteId: NoteId,
	data: NoteI,
	disableEdit?: boolean,
}

interface NoteContentActionProps {
	setNoteField: NoteFieldSetter
}

type NoteContentProps = NoteContentOwnProps & NoteContentActionProps;

export function NoteContent({ noteId, data, disableEdit, setNoteField }: NoteContentProps) {
	function handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
		if (event.currentTarget.value.includes('Untitled')) {
			event.currentTarget.select();
		}
	}

	function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setNoteField(noteId, name as NoteFields, value);
	}

	const urlIsInvalid = !data;

	if (urlIsInvalid) {
		return (
			<div className="warning-msg">
				<h2>Invalid URL</h2>
				<p>The note was either deleted or the url is mispelled.</p>
			</div>
		);
	}

	return (
		<React.Fragment>
			<label>
				Title:
				<input
					name="title"
					placeholder={titlePlaceholder}
					value={data?.title}
					disabled={disableEdit}
					className="edit-note-title"
					onFocus={handleInputFocus}
					onChange={onInputChange}
				/>
			</label>

			<label>
				Note Content:
				<textarea
					name="notes"
					placeholder={textareaPlaceholder}
					value={data?.notes}
					disabled={disableEdit}
					className="edit-note-text"
					onChange={onInputChange}
				/>
			</label>
		</React.Fragment>
	);
}

const mapDispatchToProps = {
	setNoteField
};

export default connect(null, mapDispatchToProps)(NoteContent);
