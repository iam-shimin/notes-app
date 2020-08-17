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
					<Route path="/notes/recent" component={RecentTodo} />
					<Route path="/notes/most-checked" component={NotImplimented} />
					<Route path="/notes/new" component={NewTodo} />
					<Route path="/notes/:id" component={Todo} />
					<Redirect to="/notes/recent" />
				</Switch>
			</article>
		</React.Fragment>
	)
}