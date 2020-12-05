import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router'

import { addTodo } from 'actions/todoActions';

export function NewTodo({ totalCount, addTodo }) {
	
	const history = useHistory();

	useEffect(() => {
		const payload = {title: `Untitled ${totalCount + 1}`, notes: ''};
		addTodo(payload, todo => history.replace(`/notes/${todo.id}`));
	}, [addTodo, totalCount, history]);

	return null;
}

const mapStateToProps = state => ({ totalCount: state.todos.length });

const mapDispatchToProps = { addTodo }

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);