import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Location } from 'history';
// import { connect } from 'react-redux';
import { queryString } from 'utils/url';
import lastOf from 'utils/array';
import { getMostVisited } from 'utils/storage';
import { isTodo, isDoneTodo } from 'utils/deltas/todos';
import { getTitleFromNote } from 'utils/note';
import { joinString } from 'utils/primitive';

// TODO: scroll to the selected item in the sidebar

interface SideNavItemsProps {
	data: NoteI[],
	isSelectionModeOn: boolean,
	isMobile: boolean,
	selectedItemsSet: Set<number>,
	onContextMenu(id: NoteI['id']): void,
	onClick?: false | (() => void)
}

export default function SideNavItems({
	data,
	isSelectionModeOn,
	isMobile,
	selectedItemsSet,
	onContextMenu,
	onClick
}: SideNavItemsProps) {
	const search = useLocation().search;
	const query = queryString(search, 'q');
	const mostCheckedNote = getMostVisited();

	const matchedNote = data.filter(
		note =>
			query === null || note.title.toLowerCase().includes(query.toLowerCase())
	);

	if (matchedNote.length) {
		return (
			<>
				{matchedNote.map(note => {
					const noteTitle =
						note.title || getTitleFromNote(note.notes) || 'Empty Note';
					const noteByLines = note.notes.split('\n');
					const numberOftasksTotal = noteByLines.filter(isTodo).length;
					const numberOftasksDone = noteByLines.filter(isDoneTodo).length;

					const hasSubTasks = numberOftasksTotal !== 0;
					const isComplete = numberOftasksDone === numberOftasksTotal;
					const progress = isComplete
						? 'Done'
						: `${numberOftasksDone}/${numberOftasksTotal}`;
					const itemSelectionCssState = selectedItemsSet.has(note.id) && 'selected';

					function toggleNoteSelect(
						event: React.MouseEvent<HTMLAnchorElement>
					) {
						event.preventDefault();
						onContextMenu(note.id);
					}

					function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
						if (isSelectionModeOn) {
							toggleNoteSelect(event);
						}
						if (onClick) {
							onClick();
						}
					}

					function handleActiveLink(match: any, location: Location) {
						const notesOrderedByCreatedAt = data.sort((a, b) => a.id - b.id);
						const recentNote = lastOf(notesOrderedByCreatedAt);
						const isRecentNote = recentNote?.id === note.id;
						const isMostViewedNote = mostCheckedNote === String(note.id);
						const shouldShowMostViewed = location.pathname.includes(
							'most-checked'
						);
						const shouldShowRecentNote = location.pathname.includes('recent');
						const isRecentMatch = shouldShowRecentNote && isRecentNote;
						const isMostViewMatch = shouldShowMostViewed && isMostViewedNote;
						return match || isRecentMatch || isMostViewMatch;
					}

					return (
						<NavLink
							to={`/notes/${note.id}${search}`}
							isActive={handleActiveLink}
							onClick={handleClick}
							onContextMenu={toggleNoteSelect}
							className={joinString(['todo-link', itemSelectionCssState, note.priority || 'low'])}
							key={note.id}>
							{sidebarListLabelFormat(noteTitle, isMobile)} {hasSubTasks ? `[${progress}]` : null}
						</NavLink>
					);
				})}
			</>
		);
	}
	return (
		<div className="msg-sidenav-empty">
			{query ? (
				<h2>
					Nothing matched your search <em className="word-wrap" style={{ color: '#eee' }}>{query}</em>
				</h2>
			) : (
				<h2>You have nothing on your notes</h2>
			)}
			<i>Add a <Link to={{
				pathname: '/notes/new',
				title: query
			}} className="dashed-link">new note</Link> to the list.</i>
		</div>
	);
}

function sidebarListLabelFormat(title: string, isMobile: boolean) {
	const maxLength = isMobile? 24: 36;
	if (title.length > maxLength) {
		return title.slice(0, maxLength - 3) + '...';
	}
	return title;
}