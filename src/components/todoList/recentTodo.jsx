import React from 'react';

import Todo from './Todo';

export default function RecentTodo(props) {
	const todoid = localStorage.getItem('last-viewed');
	return <Todo todoid={todoid} {...props} />
}