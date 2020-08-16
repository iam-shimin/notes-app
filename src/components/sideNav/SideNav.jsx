import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
// import TodoItem from './TodoItem';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import SidebarContext from 'context/sidebar';
import {queryString} from 'utils/url';

import 'styles/list.css';

export default function SideNav() {

	const {isOpenForMobile, isMobile, toggle} = useContext(SidebarContext);
	const [contextmenu, setContextmenu] = useState(false);
	const query = queryString(useLocation().search, 'q');
	const sidebarClass = `sidenav-left${isOpenForMobile? ' open': ''}`
	
	return (
		<React.Fragment>
			<aside className={sidebarClass}>
				<SideNavItems
					contextmenu={{ show: contextmenu, setContextmenu }}
					query={query}
					onClick={isMobile && toggle} />
			</aside>
			<FloatButton label="+" />
			<ContextMenu show={contextmenu} />
		</React.Fragment>
	);
}