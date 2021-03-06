import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppbarSearch from './AppSearch';
import { useSidebar } from 'context/sidebar';

const fontSize: React.CSSProperties = { fontSize: 'initial' };

export default function AppHeader() {
	const { toggle: toggleSidebar, isMobile, isOpenForMobile } = useSidebar();
	const [isSearchShown, setIsSearchShown] = useState(false);

	const shouldShowSearch = !isMobile || isSearchShown;
	const shouldShowNav = !isMobile || !isSearchShown;
	const appBarDirection = isMobile && !isSearchShown ? 'column' : 'row';
	const headerStyle: React.CSSProperties = {
		justifyContent: 'center',
		flexDirection: appBarDirection
	};

	function showSidebar() {
		toggleSidebar();
	}

	function showSearch() {
		setIsSearchShown(true);
	}

	function hideSearch() {
		setIsSearchShown(false);
	}

	return (
		<header className="app-bar" style={headerStyle}>
			{shouldShowSearch && (
				<AppbarSearch
					onCancel={isMobile && hideSearch}
					onSearch={isMobile && !isOpenForMobile && toggleSidebar}
				/>
			)}

			{shouldShowNav && (
				<nav className="app-bar-nav">
					{isMobile && <HamburgerButton onClick={showSidebar} />}

					<NavLink to="/notes/recent" className="flex-center app-bar-nav-link">
						Recent
					</NavLink>
					<NavLink to="/notes/most-checked" className="flex-center app-bar-nav-link">
						Most Checked
					</NavLink>

					{isMobile && (
						<button className="search-btn" onClick={showSearch} style={fontSize}>
							<span role="img" aria-label="search">
								🔍
							</span>
						</button>
					)}
				</nav>
			)}
		</header>
	);
}

interface HamburgerButtonProps {
	onClick(): void
}

function HamburgerButton({ onClick }: HamburgerButtonProps) {
	const toggleSidebar = () => onClick();
	return (
		<button className="hamburger-button" onClick={toggleSidebar}>
			<span>|||</span>
		</button>
	);
}
