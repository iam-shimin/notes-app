import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Toast({messageObj, dismissTime = 3000, onDismiss = () => {}}) {
	
	const [active, setActive] = useState(true);
	const timerRef = useRef(null);

	function clearTimer() {
		clearTimeout(timerRef.current);
		timerRef.current = null;
	}

	const removeToastData = useCallback(() => {
		setActive(false);
		onDismiss(messageObj._id);
	}, [messageObj._id, onDismiss]);

	function dismissToast() {
		clearTimer();
		removeToastData();
	}

	useEffect(() => {
		if (active) {
			timerRef.current = setTimeout(removeToastData, dismissTime);
		}
		return clearTimer;
	}, [active, dismissTime, removeToastData]);

	return active && (
		<div className="toast">
			<span>{messageObj.message}</span>
			<button onClick={dismissToast}>Dismiss</button>
		</div>
	);
}