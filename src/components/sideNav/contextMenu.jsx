import React from 'react';
import {connect} from 'react-redux';

import {deleteTodo} from 'actions/todoActions';

function SideNavContextMenu({selectedItems = null, deleteTodo, onDeleted}) {
	const show = selectedItems.size > 0;

	function deleteSelected() {
		deleteTodo(Array.from(selectedItems));
		onDeleted();
	}
	return (
		<div className={`sidenav-context-menu${show > 0 ? ' active' : ''}`}>
			<button className="contextmenu-delete-button" onClick={deleteSelected}>Delete{show? ` (${selectedItems.size})`: ''}</button>
		</div>
	)
}

const mapDispatchToProps = {
	deleteTodo
}

export default connect(null, mapDispatchToProps)(SideNavContextMenu);