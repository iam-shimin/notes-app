import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppbarSearch from './AppSearch';
import { useSidebar } from 'context/sidebar';
import { useBackdrop } from 'context/backdrop';

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

	const toggleBackdrop = useBackdrop();

	function showSidebar() {
		toggleSidebar();
		if (isMobile) {
			toggleBackdrop();
		}
	}

	function showSearch() {
		setIsSearchShown(true);
		if (isMobile) {
			toggleBackdrop();
		}
	}

	function hideSearch() {
		setIsSearchShown(false);
		if (isMobile) {
			toggleBackdrop();
		}
	}

	return (
		<header className="app-bar" style={headerStyle}>
			{shouldShowSearch && (
				<AppbarSearch
					onCancel={isMobile && hideSearch}
					onSearch={!isOpenForMobile && toggleSidebar}
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
