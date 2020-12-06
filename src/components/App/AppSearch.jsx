import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { queryString } from 'utils/url';

export default function AppSearch({ onSearch }) {
	const history = useHistory();
	const { search: query, pathname = '' } = useLocation();

	function search(event) {
		const query = event.target.value;
		if (query) {
			history.push(`${pathname}?q=${query}`);
		} else {
			history.push(pathname);
		}
		if (onSearch) {
			onSearch();
		}
	}

	return (
		<input
			type="search"
			onChange={search}
			defaultValue={queryString(query, 'q')}
			placeholder="Search Notes ..."
			className="app-bar-search-box"
			autoFocus
		/>
	);
}
