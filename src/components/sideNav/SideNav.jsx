import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import TodoItem from './TodoItem';

import FloatButton from './floatButton';
import ContextMenu from './contextMenu';
import SideNavItems from './sideNavItems';
import {queryString} from 'utils/url';

import 'styles/list.css';

export default function SideNav() {
	const [contextmenu, setContextmenu] = useState(false);
	const query = queryString(useLocation().search, 'q');
	// const todos = useContext(TodoContext);
	// const todosData = query? todos.search(query): todos.todoData;
	return (
		<React.Fragment>
			<aside className="sidenav-left">
				<SideNavItems
					contextmenu={{ show: contextmenu, setContextmenu }}
					query={query}/>
			</aside>
			<FloatButton label="+" />
			<ContextMenu show={contextmenu} />
		</React.Fragment>
	);
}