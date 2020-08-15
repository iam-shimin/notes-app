import React from 'react';
import { NavLink } from 'react-router-dom';
import AppbarSearch from './AppSearch';

export default function AppHeader() {
	return (
		<header className='app-bar'>
			<AppbarSearch />
			<nav className='app-bar-nav'>
				<NavLink to='/todos/recent' className='app-bar-nav-link'>Recent</NavLink>
				<NavLink to='/todos/most-checked' className='app-bar-nav-link'>Most Checked</NavLink>
			</nav>
		</header>
	)
}