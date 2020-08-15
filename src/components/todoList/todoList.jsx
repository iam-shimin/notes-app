import React, { /* createContext */ } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import NotImplimented from 'components/notImplimented';
import SideNav from 'components/sideNav';
import Todo from './Todo';
import RecentTodo from './recentTodo';
import NewTodo from './newTodo';

export default function TodoList(props) {
	return (
		<React.Fragment>
			<SideNav />
			<article className="main-notes">
				<Switch>
					<Route path="/todos/recent" component={RecentTodo} />
					<Route path="/todos/most-checked" component={NotImplimented} />
					<Route path="/todos/new" component={NewTodo} />
					<Route path="/todos/:id" component={Todo} />
					<Redirect to="/todos/recent" />
				</Switch>
			</article>
		</React.Fragment>
	)
}