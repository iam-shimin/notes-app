import React, { useState, useEffect } from 'react';

export default function Toast({message}) {
	const [active, setActive] = useState(true);

	// useEffect(function() {
	// 	let clear;
	// 	if (active) {
	// 		clear = setTimeout(function() {
	// 			setActive(!active);
	// 			clearTimeout(clear);
	// 		}, 3000);
	// 	}
	// 	return () => clear && clearTimeout(clear);
	// });

	return active && <div className="toast">{message}</div>
}