import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import './styles/App.css';
import TodoList from './components/TodoList';
import { NavLink } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Notifications from './components/Notifications';
import { NotificationProvider } from './context/notificationContext';

function search(event) {
  window.history.pushState(null, 'Search', `?q=${event.target.value}`);
}

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <main>
          <header className='app-bar'>
            <input type="search" onChange={search} placeholder="Search TodoIt ..." className="app-bar-search-box" autoFocus />
            <nav className='app-bar-nav'>
              <NavLink to='/todos/recent' className='app-bar-nav-link'>Recent</NavLink>
              <NavLink to='/todos/most-checked' className='app-bar-nav-link'>Most Checked</NavLink>
            </nav>
          </header>
          <article>
            <Switch>
              <Route path='/todos' component={TodoList} />
              <Redirect from='/' to='/todos' />
            </Switch>
          </article>
        </main>
        <Notifications />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
