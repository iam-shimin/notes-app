import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import { useSidebar } from 'context/sidebar';
import { pushToast } from 'actions/notificationActions';

import { NotesAppState } from 'reducers';

import 'styles/list.css';

interface SideNavProps {
	noteItems: NoteI[],
	pushToast(msg: string): void
}

export function SideNav({ noteItems, pushToast }: SideNavProps) {
	const { isOpenForMobile, isMobile, toggle } = useSidebar();
	const [selectedOnContextMenu, setSelected] = useState(new Set<number>([]));
	const shouldOpenSidebar = selectedOnContextMenu.size > 0 || isOpenForMobile;
	const sidebarClass = `sidenav-left${shouldOpenSidebar ? ' open' : ''}`;

	function handleContextMenu(noteId: number) {
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
		setSelected(prev => {
			pushToast(`Deleted ${prev.size} notes`)
			return new Set([]);
		});
	}

	function handleCxSelectAll() {
		setSelected(new Set(noteItems.map(t => t.id)));
	}

	function handleCxDeselectAll() {
		setSelected(new Set([]));
	}

	useEffect(() => {
		// @ts-ignore
		const [sidebar] = document.getElementsByClassName('sidenav-left');

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isClickOutside = !sidebar.contains(target);
			//@ts-ignore
			const isAllowedClickOutside = target.matches(
				'.hamburger-button, .hamburger-button span, .contextmenu-delete-button'
			);

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
					data={noteItems}
					isSelectionModeOn={selectedOnContextMenu.size > 0}
					selectedItemsSet={selectedOnContextMenu}
					onContextMenu={handleContextMenu}
					onClick={isMobile && toggle}
				/>
			</aside>
			<FloatButton label="+" />
			<ContextMenu
				selectedItems={selectedOnContextMenu}
				onDeleted={handelDeleteSelected}
				onSelectAll={handleCxSelectAll}
				onDeselectAll={handleCxDeselectAll}
			/>
		</React.Fragment>
	);
}

const mapStateToProps = (state: NotesAppState) => ({ noteItems: state.notes });
const mapDispatchToProps = { pushToast }

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
