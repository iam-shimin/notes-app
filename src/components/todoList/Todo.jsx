import React, { useState, useEffect } from 'react';

import 'styles/note.css';

import TodoContent from './todoContent';
import { connect } from 'react-redux';

import { pushToast } from 'actions/notificationActions';
import { deleteTodo, setTodoField } from 'actions/todoActions';

function Todo({
	todoid,
	todos,
	match,
	history
}) {

	const paramid = todoid || match.params.id;
	const [noteId, setNoteId] = useState(parseInt(paramid));
	const [disableEdit, setDisableEdit] = useState(true);
	const toggleEdit = () => setDisableEdit(!disableEdit);

	const data = todos.find(todo => todo.id === noteId);

	function deleteThisTodo() {
		deleteTodo(noteId);
		pushToast(`Note ${noteId} deleted`)
		history.push('/todos');
	}

	useEffect(() => {
		setNoteId(parseInt(paramid));
		localStorage.setItem('last-viewed', paramid);
	}, [paramid])

	return (
		<article>
			<div>
				<button onClick={toggleEdit}>Edit</button>
				<select
					value={data?.priority || 'low'}
					onChange={({ target }) => setTodoField(noteId, 'priority', target.value)}>
					<option value="high">High</option>
					<option value="med">Medium</option>
					<option value="low">Low</option>
				</select>
				<button onClick={deleteThisTodo}>Delete</button>
			</div>
			<TodoContent
				noteId={noteId}
				data={data}
				disableEdit={disableEdit} />
		</article>
	);
}

const mapStateToProps = state => ({
	todos: state.todos,
	notifications: state.notifications
})

const mapDispatchToProps = {
	setTodoField,
	deleteTodo,
	pushToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)