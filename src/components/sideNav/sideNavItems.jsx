import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import {queryString} from 'utils/url';


function SideNavItems({ data, contextmenu, onClick }) {

	const search = useLocation().search;
	const query = queryString(search, 'q');
	
	const matchedTodos = data.filter(todo => (
		query === null ||
		todo.title.toLowerCase().includes(query.toLowerCase())
	));

	if (matchedTodos.length) {

		function toggleTodoSelect(event) {
			event.preventDefault();
			contextmenu.setContextmenu(!contextmenu.show);
			event.target.classList.toggle('selected');
		}

		function handleClick(event) {

			if (contextmenu.show) {
				toggleTodoSelect(event)
			}

			if (onClick) {
				onClick();
			}

		}

		return matchedTodos.map(todo => {

			const noteByLines = todo.notes.split('\n');
			const numberOftasksTotal = noteByLines.filter(total).length;
			const numberOftasksDone = noteByLines.filter(done).length;

			
			const hasSubTasks = numberOftasksTotal !== 0;
			const isComplete = numberOftasksDone === numberOftasksTotal;
			const progress = isComplete ? 'Done' : `${numberOftasksDone}/${numberOftasksTotal}`;

			return (
				<NavLink
					to={`/notes/${todo.id}${search}`}
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
				<h2>You have nothing on your notes</h2>}
			<i>Start editing to add a new note to the list.</i>
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