import React, { useState } from 'react';
import { readLines, clearLogs } from './logging';

const style = {
	width: '90%',
	margin: 'auto',
	marginTop: '3em'
}

export default function ReadLogs() {
	const [refresh, setRefresh] = useState(Date.now());
	return (
		<div style={style} key={refresh}>

			<details>
				<summary>Keys Present</summary>
				<ol>
					{Object.keys(localStorage).map(lKey => <li key={lKey}>{lKey}</li>)}
				</ol>
			</details>

			<pre>
				{readLines() || 'No Logs in this device'}
			</pre>

			<button onClick={() => {
				clearLogs();
				setRefresh(Date.now());
			}}>Clear Logs</button>
		</div>
	)
}
