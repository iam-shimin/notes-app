import React from 'react';

import { connect } from 'react-redux';

import { setTodoField } from 'actions/todoActions';

const titlePlaceholder = 'What do you need to do ?';
const textareaPlaceholder = `Write notes on:
 * How to achieve the goal
 * Deadlines
 * Who is going to help ?`;

export function TodoContent({ noteId, data, disableEdit, setTodoField }) {
	function handleInputFocus(event) {
		if (event.currentTarget.value.includes('Untitled')) {
			event.currentTarget.select();
		}
	}

	function onInputChange(event) {
		const { name, value } = event.target;
		setTodoField(noteId, name, value);
	}

	const urlIsInvalid = !data;

	return (
		<React.Fragment>
			{urlIsInvalid && (
				<div className="warning-msg">
					<h2>Invalid URL</h2>
					<p>The note was either deleted or the url is mispelled.</p>
				</div>
			)}

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
	setTodoField: setTodoField
};

export default connect(null, mapDispatchToProps)(TodoContent);
