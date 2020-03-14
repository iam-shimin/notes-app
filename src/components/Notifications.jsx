import React, { useState, useEffect } from 'react';

export default function Notifications(props) {
	const [notifications, _setNotifications] = useState([]);

	function setNotifications(notifications) {
		localStorage.setItem('notifications', JSON.stringify(notifications));
		_setNotifications(notifications);
	}

	function pushToast(message) {
		_setNotifications(noto)
	}

	return (
		<div className="notifications">
			
		</div>
	)
}