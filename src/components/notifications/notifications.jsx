import React from 'react';
import Toast from './Toast';

export default function Notifications({ notifications, dismissToast }) {
	const activeCssClass = notifications.length > 0 ? ' active' : '';

	return (
		<div className="notifications">
			<div className={`notifications-toasts${activeCssClass}`}>
				{notifications.map(msg => (
					<Toast key={msg._id} messageObj={msg} onDismiss={dismissToast} />
				))}
			</div>
		</div>
	);
}
