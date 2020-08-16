import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import 'styles/App.css';

import TodoList from 'components/todoList';
import Notifications from 'components/notifications';
import AppHeader from './AppHeader';
import {SidebarProvider} from 'context/sidebar';

import store from 'store';

function App() {
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
        <article>
          <Switch>
            <Route path='/todos' component={TodoList} />
            <Redirect to='/todos' />
          </Switch>
        </article>
      </SidebarProvider>
    </main>
  )
}

export default App;
