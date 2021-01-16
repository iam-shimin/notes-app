import React from 'react';
import { connect } from 'react-redux';

import { deleteNotes } from 'actions/noteActions';
// FIXME
interface SideNavContextMenuActions {
	deleteNotes: any
}

interface SideNavContextMenuOwnProps {
	selectedItems: Set<number>,
	onDeleted(): void,
	onSelectAll: React.ReactEventHandler<HTMLButtonElement>,
	onDeselectAll: React.ReactEventHandler<HTMLButtonElement>
};

type SideNavContextMenuProps = SideNavContextMenuOwnProps & SideNavContextMenuActions;

export function SideNavContextMenu({
	selectedItems,
	deleteNotes,
	onDeleted,
	onSelectAll,
	onDeselectAll
}: SideNavContextMenuProps) {
	const show = selectedItems.size > 0;
	const cxCssState = show ? ' active' : '';
	const deleteCount = show ? ` (${selectedItems.size})` : '';
	const canOpenOutside = selectedItems.size === 1;
	const noteId = canOpenOutside && Array.from(selectedItems)[0];

	function deleteSelected() {
		deleteNotes(Array.from(selectedItems));
		onDeleted();
	}

	return (
		<div className={`sidenav-context-menu${cxCssState}`}>
			{canOpenOutside && (
				<a
					href={`/notes/${noteId}`}
					className="btn cxmenu-btn"
					target="_blank"
					rel="noopener noreferrer">
					Open Outside
				</a>
			)}
			<button className="cxmenu-btn" onClick={onSelectAll}>
				Select All
			</button>
			<button className="cxmenu-btn" onClick={onDeselectAll}>
				Deselect All
			</button>
			<button className="cxmenu-btn cxmenu-btn-del" onClick={deleteSelected}>
				Delete{deleteCount}
			</button>
		</div>
	);
}

const mapDispatchToProps = {
	deleteNotes
};

export default connect(null, mapDispatchToProps)(SideNavContextMenu);
