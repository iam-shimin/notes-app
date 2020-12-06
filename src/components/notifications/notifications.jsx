import React from 'react';
import Toast from './Toast';
import { connect } from 'react-redux';

import { dismissToast } from 'actions/notificationActions';

export function Notifications({ notifications, dismissToast }) {
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

const mapStateToProps = state => ({
	notifications: state.notifications
});

const mapDispatchToProps = {
	dismissToast
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
