import React from 'react';

export default function SideNavContextMenu(props) {
	return (
		<div className={`sidenav-context-menu${props.show ? ' active' : ''}`}>
			<button>Delete</button>
		</div>
	)
}