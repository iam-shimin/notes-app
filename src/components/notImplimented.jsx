import React from 'react';

export default function NotImplimented(props) {

	const i = Date.now();
	const testString = 'it worked';

	return (
		<div>
			<h1>Not Implimented</h1>
			<h2>{testString} : {i}</h2>
			<h3>url: {props.match.url}</h3>
		</div>
	)
}