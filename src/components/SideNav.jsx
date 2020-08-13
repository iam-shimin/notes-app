import React, { useState, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
// import TodoItem from './TodoItem';
import TodoContext from '../context/todoContext';
import '../styles/list.css';

export default function SideNav(props) {
	const [contextmenu, setContextmenu] = useState(false);
	const query = new URLSearchParams(useLocation().search).get('q');
	const todos = useContext(TodoContext);
	const todosData = query? todos.search(query): todos.todoData;
	return (
		<React.Fragment>
			<aside className="sidenav-left">
				{TLMenuItems(todosData, { show: contextmenu, setContextmenu }, query)}
			</aside>
			<AddTodo />
			<SideNavContextMenu show={contextmenu} />
		</React.Fragment>
	);
}

function Test(props) {
	React.useEffect(() => console.log('mounted'), []);
	return null;
}

function TLMenuItems(data, contextmenu, query) {
	if (data.length) {
		return data.map(todo => {
		const numberOftasksTotal = todo.notes.split('\n').filter(item => item.startsWith('o ') || item.startsWith('* ') || item.startsWith('x ')).length;
		const numberOftasksDone = todo.notes.split('\n').filter(item => item.startsWith('* ') || item.startsWith('x ')).length;
		const isComplete = numberOftasksDone === numberOftasksTotal;
		return <NavLink to={`/todos/${todo.id}`} onClick={e => contextmenu.show && toggleTodoSelect(e)} onContextMenu={toggleTodoSelect} className="todo-link" key={todo.id}>
			{todo.title} {numberOftasksTotal !== 0? `[${isComplete? 'Done': `${numberOftasksDone}/${numberOftasksTotal}`}]`: null}
			<Test />
			</NavLink>
		})
	}
	return (
		<div className="msg-sidenav-empty">
			{query?
			<h2>Nothing matched your search <em style={{color: '#eee'}}>{query}</em></h2>:
			<h2>You have nothing on your todolist</h2>}
			<i>Start editing to add a new todo to the list.</i>
		</div>
	);

	function toggleTodoSelect(event) {
		event.preventDefault();
		contextmenu.setContextmenu(!contextmenu.show);
		event.target.classList.toggle('selected');
	}
}

function AddTodo(props) {
	return <Link to="/todos/new" className="btn-float">+</Link>
}

function SideNavContextMenu(props) {
	return (
		<div className={`sidenav-context-menu${props.show ? ' active' : ''}`}>
			<button>Delete</button>
		</div>
	)
}