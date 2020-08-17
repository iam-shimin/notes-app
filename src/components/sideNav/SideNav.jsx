import React, { useState, useContext, useEffect } from 'react';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import SidebarContext from 'context/sidebar';

import 'styles/list.css';

export default function SideNav() {

	const {isOpenForMobile, isMobile, toggle} = useContext(SidebarContext);
	const [contextmenu, setContextmenu] = useState(false);
	const sidebarClass = `sidenav-left${isOpenForMobile? ' open': ''}`

	useEffect(() => {
		const [sidebar] = document.getElementsByClassName('sidenav-left');

		function handleClickOutside(event) {
			const {target} = event;
			const isClickOutside = !sidebar.contains(target);
			const isHamburgerButtonClick = target.matches('.hamburger-button, .hamburger-button span');

			if (isOpenForMobile && !isHamburgerButtonClick && isClickOutside) {
				toggle(false);
			}
		}

		window.addEventListener('mousedown', handleClickOutside);
		return () => window.removeEventListener('mousedown', handleClickOutside);
	}, [isOpenForMobile, toggle]);
	
	return (
		<React.Fragment>
			<aside className={sidebarClass}>
				<SideNavItems
					contextmenu={{ show: contextmenu, setContextmenu }}
					onClick={isMobile && toggle} />
			</aside>
			<FloatButton label="+" />
			<ContextMenu show={contextmenu} />
		</React.Fragment>
	);
}