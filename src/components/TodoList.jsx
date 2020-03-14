import React, { /* createContext */ } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Todo from './Todo';
import SideNav from './SideNav';
import { TodoProvider } from '../context/todoContext';

function NotImplimented(props) {
	return (
		<div>
			<h1>Not Implimented</h1>
			<h3>url: {props.match.url}</h3>
		</div>
	)
}

export default function TodoList(props) {
	return (
		<TodoProvider>
			<SideNav />
			<article className="main-notes">
				<Switch>
					<Route path="/todos/recent" component={NotImplimented} />
					<Route path="/todos/most-checked" component={NotImplimented} />
					<Route path="/todos/:id?" component={Todo} />
					<Redirect to="/todos/1" />
				</Switch>
			</article>
		</TodoProvider>
	)
}