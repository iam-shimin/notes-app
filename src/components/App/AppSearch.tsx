import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

import { queryString } from 'utils/url';

interface AppSearchProps {
	onCancel?: false | ((event: React.MouseEvent<HTMLButtonElement>) => void),
	onSearch?: false | (() => void)
}

export default function AppSearch({ onCancel, onSearch }: AppSearchProps) {
	const history = useHistory();
	const { search: query, pathname = '' } = useLocation();
	const searchBoxEleRef = useRef<HTMLInputElement>(null);

	const showMobileButtons = !!onCancel;

	function search(event: React.ChangeEvent<HTMLInputElement>) {
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
		searchBoxEleRef.current?.focus();
	}

	return (
		<>
			<input
				ref={searchBoxEleRef}
				type="search"
				onChange={search}
				value={queryString(query, 'q') || ''}
				placeholder="Search Notes ..."
				className="app-bar-search-box"
				autoFocus
			/>

			{showMobileButtons && (
				<>
					<button className="btn-b" onClick={clearSearch}>X</button>
					<button
						className="btn-b"
						onClick={onCancel || undefined}>
						Cancel
					</button>
				</>
			)}
		</>
	);
}
