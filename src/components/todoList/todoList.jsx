import React, { /* createContext */ } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

import SideNav from 'components/sideNav';
import Todo from './Todo';
import RecentTodo from './recentTodo';
import NewTodo from './newTodo';
import MostVisited from './mostVisited';

function TodoListRedirect({hasTodos}) {
	const redirectionURL = hasTodos ? '/notes/recent': '/notes/new';
	return <Redirect to={redirectionURL} />;
}

const mapStateToProps = state => {hasTodos: state.todos.length !== 0}
const LandingTodoRedirect = connect(mapStateToProps)(TodoListRedirect);

export default function TodoList(props) {
	return (
		<React.Fragment>
			<SideNav />
			<article className="main-notes">
				<Switch>
					<Route path="/notes/recent" component={RecentTodo} />
					<Route path="/notes/most-checked" component={MostVisited} />
					<Route path="/notes/new" component={NewTodo} />
					<Route path="/notes/:id" component={Todo} />
					<LandingTodoRedirect />
				</Switch>
			</article>
		</React.Fragment>
	)
}