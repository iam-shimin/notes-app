import React, { useState } from 'react';
import NotePriority from 'components/noteList/notePriority';

interface FilterProps {
	list: NoteI[];
	children: (notes: NoteI[]) => JSX.Element | null;
}

const priorityType = {
	low: 0,
	med: 1,
	high: 2,
	undefined: 0
};

export default function NotesFilterer({list = [], children }: FilterProps) {
	const [filterBy, setFilterBy] = useState<Priority>('low');
	const [orderBy, setOrderBy] = useState<keyof NoteI>('title');

	const filteredNotes = list.filter(note => {
		const noteValue = (note.priority && priorityType[note.priority]) || 0;
		const filter = priorityType[filterBy] || 0;
		return noteValue >= filter;
	});

	const orderedNotes = filteredNotes.sort((a, b) => {
		switch (orderBy) {
			case 'id':
				return b.id - a.id;
			case 'title':
				if (a.title > b.title) return 1;
				else if (a.title < b.title) return -1;
				return 0;
			case 'priority':
				// @ts-ignore
				return priorityType[a.priority] - priorityType[b.priority];
			default:
				return 0;
		}
	});

	return (
		<>
			<div className="sidebar-filter">
				<h1 className="sidebar-title">All Notes</h1>
				<div className="flex">
					<label>
						<span className="filter-label">Sort</span>
						<select
							aria-label="Order notes by"
							className="todo-controls"
							value={orderBy}
							onChange={({ currentTarget }) =>
								setOrderBy(currentTarget.value as keyof NoteI)
							}>
							<option value="id">Created</option>
							<option value="title">Title</option>
							<option value="priority">Priority</option>
						</select>
					</label>
					<label>
						<span className="filter-label">Filter</span>
						<NotePriority
							label="Filter notes by priority"
							value={filterBy}
							optionLabels={{low: 'All', med: 'Medium and High', high: 'Only High'}}
							onChange={({ currentTarget }) =>
								setFilterBy(currentTarget.value as Priority)
							}
						/>
					</label>
				</div>
			</div>
			{children(orderedNotes)}
		</>
	);
}
