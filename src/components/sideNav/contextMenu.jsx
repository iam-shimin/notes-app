import React from 'react';
import {connect} from 'react-redux';

import {deleteTodo} from 'actions/todoActions';

function SideNavContextMenu({selectedItems = null, deleteTodo}) {
	const show = selectedItems.size > 0;
	return (
		<div className={`sidenav-context-menu${show > 0 ? ' active' : ''}`}>
			<button onClick={() => deleteTodo(Array.from(selectedItems))}>Delete</button>
		</div>
	)
}

const mapDispatchToProps = {
	deleteTodo
}

export default connect(null, mapDispatchToProps)(SideNavContextMenu);