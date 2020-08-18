import React, {useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import 'styles/App.css';

import TodoList from 'components/todoList';
import Notifications from 'components/notifications';
import AppHeader from './AppHeader';
import {SidebarProvider} from 'context/sidebar';
import {initVisitCounters} from 'store/storage';

import store from 'store';

function App() {

  useEffect(initVisitCounters, []);

  return (
    <BrowserRouter>
        <Provider store={store}>
          <AppLayout />
          <Notifications />
        </Provider>
    </BrowserRouter>
  );
}

function AppLayout() {
  return (
    <main>
      <SidebarProvider>
        <AppHeader />
        <article style={{position: 'relative'}}>
          <Switch>
            <Route path='/notes' component={TodoList} />
            <Redirect to='/notes' />
          </Switch>
        </article>
      </SidebarProvider>
    </main>
  )
}

export default App;
