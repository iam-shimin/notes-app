import React from 'react';

const titlePlaceholder = 'What do you need to do ?';
const textareaPlaceholder = `Write notes on:
 * How to achieve the goal
 * Deadlines
 * Who is going to help ?`;


interface NoteEditorProps {
	noteTitle: string,
	noteContent: string,
	disabled: boolean,
	onFocus: (event: React.FocusEvent<HTMLInputElement>) => void,
	onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function NoteEditor({
	noteTitle,
	noteContent,
	disabled,
	onFocus,
	onChange
}: NoteEditorProps){
	return (
		<>
		<label className="note-label">
				<span className="color-grey">Title:</span>
				<input
					name="title"
					placeholder={titlePlaceholder}
					value={noteTitle}
					disabled={disabled}
					className="note-input edit-note-title"
					onFocus={onFocus}
					onChange={onChange}
				/>
			</label>

			<label className="note-label">
				<span className="color-grey">Note Content:</span>
					<textarea
						name="notes"
						placeholder={textareaPlaceholder}
						value={noteContent}
						disabled={disabled}
						className="note-input edit-note-text"
						onChange={onChange}
					/>
			</label>
			</>
	);
}