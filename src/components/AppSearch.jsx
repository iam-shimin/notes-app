import React from 'react';
import { useHistory, useLocation } from 'react-router';

export default function AppSearch(props) {
	const history = useHistory();
	const query = useLocation().search;

	return <input
		type="search"
		onChange={search}
		defaultValue={new URLSearchParams(query).get('q')}
		placeholder="Search TodoIt ..."
		className="app-bar-search-box"
		autoFocus />

	function search(event) {
		const query = event.target.value;
		if (query) {
			history.push(`/todos?q=${query}`);
		} else {
			history.push('/todos');
		}
	}

}