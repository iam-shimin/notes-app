import React, { useContext, useEffect, useState } from 'react';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import SidebarContext from 'context/sidebar';

import 'styles/list.css';

export default function SideNav() {

	const {isOpenForMobile, isMobile, toggle} = useContext(SidebarContext);
	const [selectedOnContextMenu, setSelected] = useState(new Set([]));
	const sidebarClass = `sidenav-left${isOpenForMobile? ' open': ''}`

	function handleContextMenu(noteId) {
		const newSet = new Set(selectedOnContextMenu);

		if (selectedOnContextMenu.has(noteId)) {
			newSet.delete(noteId);
			setSelected(newSet);
		} else {
			newSet.add(noteId);
		}

		setSelected(newSet);
	}

	function checkIfContextMenuShowing(noteId) {
		return selectedOnContextMenu.has(noteId);
	}

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
					checkIfContextMenuShowing={checkIfContextMenuShowing}
					onContextMenu={handleContextMenu}
					onClick={isMobile && toggle} />
			</aside>
			<FloatButton label="+" />
			<ContextMenu selectedItems={selectedOnContextMenu} />
		</React.Fragment>
	);
}