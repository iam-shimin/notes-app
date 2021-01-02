import React from 'react';

import Note from 'components/noteList/note';
import { getMostVisited } from 'utils/storage';

export default function MostVisited(props) {
	return <Note reqNoteId={getMostVisited()} {...props} />;
}
