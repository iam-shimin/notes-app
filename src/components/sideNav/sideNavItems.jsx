import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


function SideNavItems({ data, contextmenu, query, onClick }) {
	if (data.length) {

		function toggleTodoSelect(event) {
			event.preventDefault();
			contextmenu.setContextmenu(!contextmenu.show);
			event.target.classList.toggle('selected');
		}

		return data.map(todo => {

			const numberOftasksTotal = todo.notes.split('\n').filter(total).length;
			const numberOftasksDone = todo.notes.split('\n').filter(done).length;

			
			const hasSubTasks = numberOftasksTotal !== 0;
			const isComplete = numberOftasksDone === numberOftasksTotal;
			const progress = isComplete ? 'Done' : `${numberOftasksDone}/${numberOftasksTotal}`;

			function handleClick(event) {

				if (contextmenu.show) {
					toggleTodoSelect(event)
				}

				if (onClick) {
					onClick();
				}

			}

			return (
				<NavLink
					to={`/todos/${todo.id}`}
					onClick={handleClick}
					onContextMenu={toggleTodoSelect}
					className="todo-link"
					key={todo.id}>
					{todo.title} {hasSubTasks ? `[${progress}]` : null}
				</NavLink>
			)
		})
	}
	return (
		<div className="msg-sidenav-empty">
			{query ?
				<h2>Nothing matched your search <em style={{ color: '#eee' }}>{query}</em></h2> :
				<h2>You have nothing on your todolist</h2>}
			<i>Start editing to add a new todo to the list.</i>
		</div>
	);
}

function total(item) {
	return (
		item.startsWith('o ') ||
		item.startsWith('* ') ||
		item.startsWith('x ')
	)
}

function done(item) {
	return item.startsWith('* ') || item.startsWith('x ');
}

const mapStateToProps = state => ({
	data: state.todos
})

export default connect(mapStateToProps)(SideNavItems)