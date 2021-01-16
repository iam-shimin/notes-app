import React from 'react';

import Note from 'components/noteList/note';
import { getMostVisited } from 'utils/storage';

export default function MostVisited(props: RouterReceivedProps) {
	const mostVisitedNoteId = getMostVisited();
	
	if (!mostVisitedNoteId)
		return null;

	return <Note reqNoteId={mostVisitedNoteId} {...props} />;
}
