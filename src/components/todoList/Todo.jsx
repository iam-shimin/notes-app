import React, { useState, useEffect } from 'react';

import 'styles/note.css';

import TodoContent from './todoContent';
import { connect } from 'react-redux';

import { pushToast } from 'actions/notificationActions';
import { deleteTodo, setTodoField } from 'actions/todoActions';
import { increaseCount } from 'utils/storage';

export function Todo({
	todoid,
	todos,
	match,
	pushToast,
	setTodoField,
	deleteTodo,
	history
}) {

	const paramid = todoid || match.params.id;
	const [noteId, setNoteId] = useState(parseInt(paramid));
	const [disableEdit, setDisableEdit] = useState(true);
	const toggleEdit = () => setDisableEdit(!disableEdit);

	const data = todos.find(todo => todo.id === noteId);

	function deleteThisTodo() {
		const thisTodoIndex = todos.findIndex(todo => todo.id === noteId);
		const prevTodoIndex = thisTodoIndex !== 0 && thisTodoIndex - 1;
		const prevTodoId = todos[prevTodoIndex]? `/${todos[prevTodoIndex].id}`: '';

		deleteTodo([noteId]);
		pushToast(`Note ${noteId} deleted`)
		history.push(`/notes${prevTodoId}`);
	}

	useEffect(() => {
		setNoteId(parseInt(paramid));
		if (paramid) {
			increaseCount(paramid);
		}
		setDisableEdit(true);
	}, [paramid])

	return (
		<>
			<div>
				<button className="todo-controls" onClick={toggleEdit}>{disableEdit? 'Edit': 'Save'}</button>
				<select
					className="todo-controls"
					value={data?.priority || 'low'}
					onChange={({ target }) => setTodoField(noteId, 'priority', target.value)}>
					<option value="high">High</option>
					<option value="med">Medium</option>
					<option value="low">Low</option>
				</select>
				<button className="todo-controls" onClick={deleteThisTodo}>Delete</button>
			</div>
			<TodoContent
				noteId={noteId}
				data={data}
				disableEdit={disableEdit} />
		</>
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