import React from 'react';
import { connect } from 'react-redux';

import Note from './note';
import lastOf from 'utils/array';

function RecentNote({ lastNoteId, ...restProps }) {
	return <Note reqNoteId={lastNoteId} {...restProps} />;
}

const mapStateToProps = state => ({ lastNoteId: lastOf(state.notes)?.id });

export default connect(mapStateToProps)(RecentNote);
