import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

import SideNav from 'components/sideNav';
import Note from './note';
import RecentNote from './recentNote';
import NewNote from './newNote';
import MostVisited from './mostVisited';

function NotePageRedirect({ hasNotes }) {
	const redirectionURL = hasNotes ? '/notes/recent' : '/notes/new';
	return <Redirect to={redirectionURL} />;
}

const mapStateToProps = state => ({ hasNotes: state.notes.length !== 0 });

const LandingPageRedirect = connect(mapStateToProps)(NotePageRedirect);

export default function NotesPage() {
	return (
		<React.Fragment>
			<SideNav />
			<article className="main-notes">
				<Switch>
					<Route path="/notes/recent" component={RecentNote} />
					<Route path="/notes/most-checked" component={MostVisited} />
					<Route path="/notes/new" component={NewNote} />
					<Route path="/notes/:id" component={Note} />
					<LandingPageRedirect />
				</Switch>
			</article>
		</React.Fragment>
	);
}
