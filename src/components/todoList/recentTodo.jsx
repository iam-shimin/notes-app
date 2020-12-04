import React from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import lastOf from 'utils/array';

function RecentTodo({ lastTodoId, ...restProps}) {
	return <Todo todoid={lastTodoId} {...restProps} />
}

const mapStateToProps = state => ({ lastTodoId: lastOf(state.todos)?.id })

export default connect(mapStateToProps)(RecentTodo);