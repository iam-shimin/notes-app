import React from 'react';

import Todo from './Todo';
import {getLastVisited} from 'store/storage';

export default function RecentTodo(props) {
	return <Todo todoid={getLastVisited()} {...props} />
}