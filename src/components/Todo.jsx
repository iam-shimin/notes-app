import React, { useState, useEffect, useContext } from 'react';
import '../styles/note.css';
import TodoContext from '../context/todoContext';
import NotificationContext from '../context/notificationContext';

const textareaPlaceholder = `Write notes on:
* How to achieve the goal
* Deadlines
* Who is going to help ?`;

export default function Todo(props) {

	const paramid = props.match.params.id;
	const [noteId, setNoteId] = useState(parseInt(paramid));
	const [disableEdit, setDisableEdit] = useState(true);
	const todos = useContext(TodoContext);
	const notifications = useContext(NotificationContext);
	const toggleEdit = () => setDisableEdit(!disableEdit);

	useEffect(() => setNoteId(parseInt(paramid)), [paramid])

	const data = todos.todoData.find(todo => todo.id === noteId);
	return (
		<article>
			<div>
				<button onClick={toggleEdit}>Edit</button>
				<select value={(data && data.priority) || 'low'} onChange={({ target }) => todos.setTodoField(noteId, 'priority', target.value)}>
					<option value="high">High</option>
					<option value="med">Medium</option>
					<option value="low">Low</option>
				</select>
				<button onClick={e => {
					todos.deleteTodo(noteId);
					notifications.pushToast(`Note ${noteId} deleted`)
					props.history.push('/todos');
				}}>Delete</button>
			</div>
			<TodoMain
				urlmatch={props.match}
				noteId={noteId}
				setNoteId={setNoteId}
				data={data}
				context={todos}
				history={props.history}
				disableEdit={disableEdit} />
		</article>
	);
}

function TodoMain(props) {

	useEffect(() => {
		props.urlmatch.params.id === 'new' && newTodo({title: 'Untitled', notes: ''});
	});

	return (
		<React.Fragment>
			{props.urlmatch.params.id && !props.data && !Number.isNaN(props.noteId) && <div className="warning-msg">
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
		if (Number.isNaN(props.noteId) || !props.context.todoExists(props.noteId)) {
			newTodo({ title: 'Untitled', notes: '', [name]: value });
		} else {
			props.context.setTodoField(props.noteId, name, value);
		}
	}

	function newTodo(todo = { title: '', notes: '' }) {
		let newid = props.context.addTodo(todo).id;
		props.setNoteId(newid);
		props.history.push(`/todos/${newid}`);
	}
}