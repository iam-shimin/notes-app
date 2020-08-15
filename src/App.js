import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import './styles/App.css';
import TodoList from './components/TodoList';
// import { Provider } from 'react-redux';
import Notifications from './components/Notifications';
import { NotificationProvider } from './context/notificationContext';
import { TodoProvider } from './context/todoContext';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <NotificationProvider>
          <AppLayout />
          <Notifications />
        </NotificationProvider>
      </TodoProvider>
    </BrowserRouter>
  );
}

function AppLayout() {
  return (
    <main>
      <AppHeader />
      <article>
        <Switch>
          <Route path='/todos' component={TodoList} />
          <Redirect to='/todos' />
        </Switch>
      </article>
    </main>
  )
}

export default App;
