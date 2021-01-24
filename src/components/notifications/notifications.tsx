import React from 'react';
import Toast from './Toast';

interface NotificationsProps {
	notifications: NotificationI[],
	dismissToast: React.ComponentProps<typeof Toast>['onDismiss']
};

export default function Notifications({ notifications, dismissToast }: NotificationsProps) {
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
