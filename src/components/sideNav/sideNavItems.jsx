import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
// import { connect } from 'react-redux';
import {queryString} from 'utils/url';
import lastOf from 'utils/array';
import { getMostVisited } from 'utils/storage';
import { total, done } from 'utils/todos';

// TODO: scroll to the selected item in the sidebar

export default function SideNavItems({
	data,
	isSelectionModeOn,
	selectedItemsSet,
	onContextMenu,
	onClick
}) {

	const search = useLocation().search;
	const query = queryString(search, 'q');
	const mostCheckedTodo = getMostVisited();
	const recentTodo = lastOf(data);
	
	const matchedTodos = data.filter(todo => (
		query === null ||
		todo.title.toLowerCase().includes(query.toLowerCase())
	));

	if (matchedTodos.length) {

		return matchedTodos.map(todo => {

			const noteByLines = todo.notes.split('\n');
			const numberOftasksTotal = noteByLines.filter(total).length;
			const numberOftasksDone = noteByLines.filter(done).length;

			
			const hasSubTasks = numberOftasksTotal !== 0;
			const isComplete = numberOftasksDone === numberOftasksTotal;
			const progress = isComplete ? 'Done' : `${numberOftasksDone}/${numberOftasksTotal}`;
			const itemSelectionCssState = selectedItemsSet.has(todo.id)? ' selected': '';

			function toggleTodoSelect(event) {
				event.preventDefault();
				onContextMenu(todo.id);
			}

			function handleClick(event) {
				if (isSelectionModeOn) {
					toggleTodoSelect(event)
				}
				if (onClick) {
					onClick();
				}
			}

			function handleActiveLink(match, location) {
				const isRecentTodo = recentTodo.id === todo.id;
				const isMostViewedTodo = mostCheckedTodo === String(todo.id);
				const shouldShowMostViewed = location.pathname.includes('most-checked');
				const shouldShowRecentTodo = location.pathname.includes('recent');
				const isRecentMatch = shouldShowRecentTodo && isRecentTodo;
				const isMostViewMatch = shouldShowMostViewed && isMostViewedTodo;
				return match || isRecentMatch || isMostViewMatch;
			}

			return (
				<NavLink
					to={`/notes/${todo.id}${search}`}
					isActive={handleActiveLink}
					onClick={handleClick}
					onContextMenu={toggleTodoSelect}
					className={`todo-link${itemSelectionCssState}`}
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