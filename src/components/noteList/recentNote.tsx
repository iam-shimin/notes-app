import React from 'react';
import { connect } from 'react-redux';

import Note from './note';
import lastOf from 'utils/array';
import { NoteId } from './noteListTypes';

interface RecentNoteProps extends RouterReceivedProps {
	lastNoteId: NoteId
}

function RecentNote({ lastNoteId, ...restProps }: RecentNoteProps) {
	return <Note reqNoteId={lastNoteId} {...restProps} />;
}
// @ts-ignore
const mapStateToProps = state => ({ lastNoteId: lastOf(state.notes)?.id });

export default connect(mapStateToProps)(RecentNote);
