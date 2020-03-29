import React, { useContext } from 'react';
import Toast from './Toast';
import notificationContext from '../context/notificationContext';

export default function Notifications(props) {
	const notifications = useContext(notificationContext);
	return (
		<div className="notifications">
			<div className={`notifications-toasts${notifications.toasts.length > 0? ' active': ''}`}>
				{notifications.toasts.map(msg => <Toast key={msg._id} messageObj={msg} onDismiss={notifications.dismissToast} />)}
			</div>
		</div>
	)
}