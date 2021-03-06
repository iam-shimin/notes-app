import React from 'react';

import { connect } from 'react-redux';

import NotePreview from './notePreview';
import NoteEditor from './noteEditor';
import { setNoteField } from 'actions/noteActions';
import { NoteFieldSetter, NoteFields, NoteId } from './noteListTypes';


interface NoteContentOwnProps {
	noteId: NoteId,
	data: NoteI,
	disableEdit: boolean
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
		return <NoteUrlError />;
	} else if (disableEdit) {
		return (
			<NotePreview
				data={data}
				onTodoStatusChange={note => setNoteField(data.id, 'notes', note)}
			/>
		);
	} else {
		return (
			<NoteEditor 
				noteTitle={data?.title}
				noteContent={data?.notes}
				disabled={disableEdit}
				onFocus={handleInputFocus}
				onChange={onInputChange} />
		);
	}
}

function NoteUrlError() {
	return (
		<div className="warning-msg">
			<h2>Invalid URL</h2>
			<p>The note was either deleted or the url is mispelled.</p>
		</div>
	);
}

const mapDispatchToProps = {
	setNoteField
};
//@ts-ignore
export default connect(null, mapDispatchToProps)(NoteContent);
