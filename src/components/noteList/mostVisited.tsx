import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Note from 'components/noteList/note';
import { getMostVisited } from 'utils/storage';

export default function MostVisited(props: RouteComponentProps) {
	const mostVisitedNoteId = getMostVisited();

	if (!mostVisitedNoteId)
		return null;

	return <Note reqNoteId={mostVisitedNoteId} {...props} />;
}
