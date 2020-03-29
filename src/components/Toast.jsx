import React, { useState, useEffect } from 'react';

export default function Toast({messageObj, dismissTime, onDismiss}) {
	const _dismissTime = dismissTime || 3000;
	const [active, setActive] = useState(true);

	useEffect(function() {
		let clear;
		if (active) {
			clear = setTimeout(function() {
				setActive(!active);
				onDismiss && onDismiss(messageObj._id);
				clearTimeout(clear);
			}, _dismissTime);
		}
		return () => clear && clearTimeout(clear);
	});

	return active && <div className="toast">{messageObj.message}</div>
}