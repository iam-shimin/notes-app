import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { queryString } from 'utils/url';

export default function AppSearch({ onCancel, onSearch }) {
	const history = useHistory();
	const { search: query, pathname = '' } = useLocation();

	const showMobileButtons = !!onCancel;

	function search(event) {
		const query = event.target.value;
		if (query) {
			history.replace(`${pathname}?q=${query}`);
		} else {
			history.push(pathname);
		}
		if (onSearch) {
			onSearch();
		}
	}

	function clearSearch() {
		history.replace(pathname);
	}

	return (
		<>
			<input
				type="search"
				onChange={search}
				value={queryString(query, 'q') || ''}
				placeholder="Search Notes ..."
				className="app-bar-search-box"
				autoFocus
			/>

			{showMobileButtons && (
				<>
					<button className="main-btn btn-b" onClick={clearSearch}>X</button>
					<button
						className="main-btn btn-b"
						onClick={onCancel}>
						Cancel
					</button>
				</>
			)}
		</>
	);
}
