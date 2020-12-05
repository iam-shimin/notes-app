import React from 'react';
import {connect} from 'react-redux';

import {deleteTodo} from 'actions/todoActions';

export function SideNavContextMenu({
	selectedItems = null,
	deleteTodo,
	onDeleted,
	onSelectAll,
	onDeselectAll
}) {
	const show = selectedItems.size > 0;
	const cxCssState = show ? ' active' : '';
	const deleteCount = show? ` (${selectedItems.size})`: '';

	function deleteSelected() {
		deleteTodo(Array.from(selectedItems));
		onDeleted();
	}
	return (
		<div className={`sidenav-context-menu${cxCssState}`}>
			<button className="cxmenu-btn" onClick={onSelectAll}>Select All</button>
			<button className="cxmenu-btn" onClick={onDeselectAll}>Deselect All</button>
			<button className="cxmenu-btn cxmenu-btn-del" onClick={deleteSelected}>Delete{deleteCount}</button>
		</div>
	)
}

const mapDispatchToProps = {
	deleteTodo
}

export default connect(null, mapDispatchToProps)(SideNavContextMenu);