import React, { useState, useEffect } from 'react';

export default function Toast({messageObj, dismissTime = 3000, onDismiss}) {
	
	const [active, setActive] = useState(true);

	useEffect(() => {
		let clear;
		if (active) {
			clear = setTimeout(() => {
				setActive(!active);
				onDismiss && onDismiss(messageObj._id);
				clearTimeout(clear);
			}, dismissTime);
		}
		return () => clear && clearTimeout(clear);
	});

	return active && (
		<div className="toast">
			<span>{messageObj.message}</span>
			<button onClick={() => onDismiss(messageObj._id)}>Dismiss</button>
		</div>
	);
}