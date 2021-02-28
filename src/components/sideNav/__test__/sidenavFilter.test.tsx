import React from 'react';
import { render } from '@testing-library/react';
import Filter from '../filter';
import dummyNotes from 'components/noteList/__test__/dummyNotesData';

describe.skip('<SidebarFilter />', () => {
	test.skip('shows all notes initially', () => {
		const { getAllByRole } = render(
			<Filter
				list={dummyNotes}
				children={filteredList => (
					<>
						{filteredList.map(note => (
							<b role="listitem">{note.title}</b>
						))}
					</>
				)}
			/>
		);
		const listitem = getAllByRole('listitem');

		expect(listitem.length).toBe(dummyNotes.length)
	});
});
