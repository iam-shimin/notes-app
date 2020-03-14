import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
// import TodoItem from './TodoItem';
import TodoContext from '../context/todoContext';
import '../styles/list.css';

export default function SideNav(props) {
	const [contextmenu, setContextmenu] = useState(false);
	return (
		<React.Fragment>
			<TodoContext>
				{context => (
					<React.Fragment>
						<aside className="sidenav-left">
							{TLMenuItems(context.todoData, {show: contextmenu, setContextmenu})}
						</aside>
						<AddTodo />
						<SideNavContextMenu show={contextmenu} />
					</React.Fragment>
				)}
			</TodoContext>
		</React.Fragment>

	);
}

function TLMenuItems(data, contextmenu) {
	if (data.length) {
		return data.map(todo => <NavLink to={`/todos/${todo.id}`} onClick={e => contextmenu.show && toggleTodoSelect(e)} onContextMenu={toggleTodoSelect} className="todo-link" key={todo.id}>{todo.title}</NavLink>)
	}
	return (
		<div className="msg-sidenav-empty">
			<h2>You have nothing on your todolist</h2>
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
		<div className={`sidenav-context-menu${props.show? ' active': ''}`}>
			<button>Delete</button>
		</div>
	)
}