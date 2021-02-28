import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Note from './note';
import lastOf from 'utils/array';
import { NoteId } from './noteListTypes';
import { NotesAppState } from 'reducers';

interface RecentNoteProps extends RouteComponentProps {
	lastNoteId?: NoteId
}

function RecentNote({ lastNoteId, ...restProps }: RecentNoteProps) {
	if (!lastNoteId)
		return null;

	return <Note reqNoteId={lastNoteId} {...restProps} />;
}

const mapStateToProps = (state: NotesAppState) => ({ lastNoteId: lastOf(state.notes)?.id });

export default connect(mapStateToProps)(RecentNote);
