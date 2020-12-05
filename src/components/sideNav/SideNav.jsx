import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import SidebarContext from 'context/sidebar';

import 'styles/list.css';

export function SideNav({ todoItems }) {

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

	function handelDeleteSelected() {
		setSelected(new Set([]));
	}

	function handleCxSelectAll() {
		setSelected(new Set(todoItems.map(t => t.id)));
	}

	function handleCxDeselectAll() {
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
					data={todoItems}
					isSelectionModeOn={selectedOnContextMenu.size > 0}
					selectedItemsSet={selectedOnContextMenu}
					onContextMenu={handleContextMenu}
					onClick={isMobile && toggle} />
			</aside>
			<FloatButton label="+" />
			<ContextMenu
				selectedItems={selectedOnContextMenu}
				onDeleted={handelDeleteSelected}
				onSelectAll={handleCxSelectAll}
				onDeselectAll={handleCxDeselectAll} />
		</React.Fragment>
	);
}

const mapStateToProps = state => ({ todoItems: state.todos })

export default connect(mapStateToProps)(SideNav)