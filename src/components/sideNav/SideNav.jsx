import React, { useContext, useEffect, useState } from 'react';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import SidebarContext from 'context/sidebar';

import 'styles/list.css';

export default function SideNav() {

	const {isOpenForMobile, isMobile, toggle} = useContext(SidebarContext);
	const [selectedOnContextMenu, setSelected] = useState(new Set([]));
	const shouldOpenSidebar = selectedOnContextMenu.size > 0 || isOpenForMobile;
	const sidebarClass = `sidenav-left${shouldOpenSidebar? ' open': ''}`

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

	function handelDeleteSelected() {
		setSelected(new Set([]));
	}

	useEffect(() => {
		const [sidebar] = document.getElementsByClassName('sidenav-left');

		function handleClickOutside(event) {
			const {target} = event;
			const isClickOutside = !sidebar.contains(target);
			const isAllowedClickOutside = target.matches('.hamburger-button, .hamburger-button span, .contextmenu-delete-button');

			if (isOpenForMobile && !isAllowedClickOutside && isClickOutside) {
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
			<ContextMenu selectedItems={selectedOnContextMenu} onDeleted={handelDeleteSelected} />
		</React.Fragment>
	);
}