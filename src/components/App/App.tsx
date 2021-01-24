import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import 'styles/App.css';

import NotesPage from 'components/noteList';
import NotificationPannel from 'components/notifications/notificationPannel';
import AppHeader from './AppHeader';
import { SidebarProvider } from 'context/sidebar';
import { initVisitCounters } from 'utils/storage';

import store from 'store';

function App() {
	useEffect(initVisitCounters, []);

	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppLayout />
				<NotificationPannel />
			</Provider>
		</BrowserRouter>
	);
}

const relativePosition: React.CSSProperties = { position: 'relative' };

function AppLayout() {
	return (
		<main>
			<SidebarProvider>
				<AppHeader />
				<article style={relativePosition}>
					<Switch>
						<Route path="/notes" component={NotesPage} />
						<Redirect to="/notes" />
					</Switch>
				</article>
			</SidebarProvider>
		</main>
	);
}

export default App;
