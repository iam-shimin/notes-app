import React from 'react';

import { connect } from 'react-redux';

import { dismissToast } from 'actions/notificationActions';

const Notification = React.lazy(() => import('./notifications'));


function NotificationPannel(
	{ notifications, dismissToast }: React.ComponentProps<typeof Notification>
) {
	if (!notifications.length)
		return null;

	return (
		<React.Suspense fallback="loading ...">
			<Notification
				notifications={notifications}
				dismissToast={dismissToast}
			/>
		</React.Suspense>
	);
}
// @ts-ignore
const mapStateToProps = state => ({
	notifications: state.notifications
});

const mapDispatchToProps = {
	dismissToast
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPannel);
