import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ToastProps {
	messageObj: NotificationI,
	dismissTime?: number,
	onDismiss: (id: NotificationI['_id']) => void
}

export default function Toast({
	messageObj,
	dismissTime = 3000,
	onDismiss = () => {}
}: ToastProps
) {
	const [active, setActive] = useState(true);
	const timerRef = useRef<NodeJS.Timeout>();

	function clearTimer() {
		if (timerRef.current)
			clearTimeout(timerRef.current);
		timerRef.current = undefined;
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

	return (
		(active || null) && (
			<div className="toast">
				<span>{messageObj.message}</span>
				<button onClick={dismissToast}>Dismiss</button>
			</div>
		)
	);
}
