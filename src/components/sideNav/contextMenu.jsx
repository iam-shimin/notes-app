import React from 'react';
import { connect } from 'react-redux';

import { deleteNotes } from 'actions/noteActions';

export function SideNavContextMenu({
	selectedItems = null,
	deleteNotes,
	onDeleted,
	onSelectAll,
	onDeselectAll
}) {
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
