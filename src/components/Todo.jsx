import React, { useState, useEffect } from 'react';
import '../styles/note.css';
import TodoContext from '../context/todoContext';
const textareaPlaceholder = `Write notes on:
* How to achieve the goal
* Deadlines
* Who is going to help ?`;
export default function Todo(props) {

	const paramid = props.match.params.id;
	const [noteId, setNoteId] = useState(parseInt(paramid));
	const [disableEdit, setDisableEdit] = useState(true);
	const toggleEdit = () => setDisableEdit(!disableEdit);

	useEffect(() => setNoteId(parseInt(paramid)), [paramid])

	return (
		<TodoContext>
			{context => {
				const data = context.todoData.find(todo => todo.id === noteId);
				return (
					<article>
						<div>
							<button onClick={toggleEdit}>Edit</button>
							<select value={(data && data.priority) || 'low'} onChange={({ target }) => context.setTodoField(noteId, 'priority', target.value)}>
								<option value="high">High</option>
								<option value="med">Medium</option>
								<option value="low">Low</option>
							</select>
							<button onClick={e => {
								context.deleteTodo(noteId);
								props.history.push('/todos');
							}}>Delete</button>
						</div>
						<TodoMain
							urlmatch={props.match}
							noteId={noteId}
							setNoteId={setNoteId}
							data={data}
							context={context}
							history={props.history}
							disableEdit={disableEdit} />
					</article>
				)
			}}
		</TodoContext>
	);
}

function TodoMain(props) {

	useEffect(() => {
		const id = props.urlmatch.params.id;
		if (id === 'new') {
			let newid = props.context.addTodo({title: 'Untitled', notes: ''}).id;
			props.setNoteId(newid);
			props.history.push(`/todos/${newid}`);
		}
	});

	return (
		<React.Fragment>
			{!props.data && !Number.isNaN(props.noteId) && <div className="warning-msg">
				<h2>Invalid URL</h2>
				<p>The note was either deleted or the url is mispelled.</p>
			</div>}
			<hgroup>
				<h1><input placeholder="What do you need to do ?" value={(props.data && props.data.title) || ''} name="title" onChange={onInputChange} disabled={props.disableEdit} className="edit-note-title" /></h1>
				<h3>static link: {props.urlmatch.params.id}</h3>
			</hgroup>
			<textarea placeholder={textareaPlaceholder} value={(props.data && props.data.notes) || ''} name="notes" onChange={onInputChange} disabled={props.disableEdit} className="edit-note-text" />
		</React.Fragment>
	);

	function onInputChange(event) {
		const { name, value } = event.target;
		props.context.setTodoField(props.noteId, name, value);
	}
}