import React, { /* createContext */ } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Todo from './Todo';
import SideNav from './SideNav';
import { TodoProvider } from '../context/todoContext';

function NotImplimented(testString, i) {
	return function(props) {
		return (
			<div>
				<h1>Not Implimented</h1>
				<h2>{testString} : {i}</h2>
				<h3>url: {props.match.url}</h3>
			</div>
		)
	}
}

export default function TodoList(props) {
	const testString = 'it worked';
	const i = Date.now();
	return (
		<TodoProvider>
			<SideNav />
			<article className="main-notes">
				<Switch>
					<Route path="/todos/recent" component={NotImplimented('Test string for recent filter', i)} />
					<Route path="/todos/most-checked" component={NotImplimented(testString, i)} />
					<Route path="/todos/:id?" component={Todo} />
					<Redirect to="/todos/1" />
				</Switch>
			</article>
		</TodoProvider>
	)
}