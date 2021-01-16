import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Note from './note';
import lastOf from 'utils/array';
import { NoteId } from './noteListTypes';

interface RecentNoteProps extends RouteComponentProps {
	lastNoteId: NoteId
}

function RecentNote({ lastNoteId, ...restProps }: RecentNoteProps) {
	return <Note reqNoteId={lastNoteId} {...restProps} />;
}
// @ts-ignore
const mapStateToProps = state => ({ lastNoteId: lastOf(state.notes)?.id });

export default connect(mapStateToProps)(RecentNote);
