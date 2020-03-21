import React, { useState, useCallback } from 'react';
import Toast from './Toast';

export default function Notifications(props) {
	const [notifications, setNotifications] = useState([]);
	const [toasts, setToasts] = useState([]);

	const pushToast = useCallback((message) => {
		let tmp = toasts;
		if (toasts.length > 5) {
			tmp = toasts.slice(1);
		}
		setToasts([...tmp, {_id: Date.now(), message}]);
	});

	return (
		<div className="notifications">
			<div className="notifications-toasts">
				{notifications.map(msg => <Toast key={msg._id} message={msg.message} />)}
			</div>
		</div>
	)
}