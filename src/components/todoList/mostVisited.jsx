import React from 'react';

import Todo from 'components/todoList/Todo';
import {getMostVisited} from 'store/storage';

export default function MostVisited(props) {
	return <Todo todoid={getMostVisited()} {...props} />
}