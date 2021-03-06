import React from 'react';
import Toast from './Toast';
import useMatchMedia from 'hooks/useMatchMedia';

interface NotificationsProps {
	notifications: NotificationI[],
	dismissToast: React.ComponentProps<typeof Toast>['onDismiss']
};

export default function Notifications({ notifications, dismissToast }: NotificationsProps) {
	const isMobile = useMatchMedia('(max-width: 500px)');
	const activeCssClass = notifications.length > 0 ? ' active' : '';

	return (
		<div className="notifications" style={{right: isMobile? '21%': '5%'}}>
			<div className={`notifications-toasts${activeCssClass}`}>
				{notifications.map(msg => (
					<Toast key={msg._id} messageObj={msg} onDismiss={dismissToast} />
				))}
			</div>
		</div>
	);
}
