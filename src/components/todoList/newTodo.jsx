import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router'

import { addTodo } from 'actions/todoActions';

function NewTodo({lastTodoItemId, addTodo}) {

	const isMounted = useRef(false);

	useEffect(() => {
		addTodo({title: 'Untitled', notes: ''});
		if (isMounted.current === false) {
			isMounted.current = true;
		}
	}, [addTodo]);

	return (isMounted.current && lastTodoItemId)? // NewTodo is remounted every time the float button is clicked
		<Redirect to={`/notes/${lastTodoItemId}`} />: null; // redirect unmounts NewTodo component
}

const mapStateToProps = state => {
	const todos = state.todos;
	return {lastTodoItemId: todos[todos.length - 1]?.id}
}

const mapDispatchToProps = {
	addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);