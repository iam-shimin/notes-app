import React, { useContext } from 'react';
import Toast from './Toast';
import notificationContext from '../context/notificationContext';

export default function Notifications(props) {
	// const [notifications, setNotifications] = useState([]);
	const notifications = useContext(notificationContext);
	console.log(notifications);

	return (
		<div className="notifications">
			<div className="notifications-toasts">
				{notifications.toasts.map(msg => <Toast key={msg._id} message={msg.message} />)}
			</div>
		</div>
	)
}