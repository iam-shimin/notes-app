import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

import SideNav from 'components/sideNav';
import Note from './note';
import RecentNote from './recentNote';
import NewNote from './newNote';
import MostVisited from './mostVisited';
import { NotesAppState } from 'reducers';

interface NotePageRedirectProps { hasNotes: boolean }

function NotePageRedirect({ hasNotes }: NotePageRedirectProps) {
	const redirectionURL = hasNotes ? '/notes/recent' : '/notes/new';
	return <Redirect to={redirectionURL} />;
}

const mapStateToProps = (state: NotesAppState) => ({ hasNotes: state.notes.length !== 0 });

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
