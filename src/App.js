import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import './styles/App.css';
import TodoList from './components/TodoList';
import { NavLink } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Notifications from './components/Notifications';
import AppbarSearch from './components/AppSearch';
import { NotificationProvider } from './context/notificationContext';
import { TodoProvider } from './context/todoContext';

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <NotificationProvider>
          <main>
            <header className='app-bar'>
              <AppbarSearch />
              <nav className='app-bar-nav'>
                <NavLink to='/todos/recent' className='app-bar-nav-link'>Recent</NavLink>
                <NavLink to='/todos/most-checked' className='app-bar-nav-link'>Most Checked</NavLink>
              </nav>
            </header>
            <article>
              <Switch>
                <Route path='/todos' component={TodoList} />
                <Redirect to='/todos' />
              </Switch>
            </article>
          </main>
          <Notifications />
        </NotificationProvider>
      </TodoProvider>
    </BrowserRouter>
  );
}

export default App;
