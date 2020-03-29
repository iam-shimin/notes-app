import React, { createContext, useState } from 'react';

const NotificationsContext = createContext();

export function NotificationProvider(props) {
	const [toasts, setToasts] = useState([]);
	function pushToast(message) {
		setToasts(toasts => {
			if (toasts.length > 5) {
				return toasts.slice(1).concat({ _id: Date.now(), message })
			}
			return toasts.concat({ _id: Date.now(), message })
		})
	}
	function dismissToast(id) {
		setToasts(toasts => toasts.filter(item => item._id !== id));
	}
	return <NotificationsContext.Provider value={{pushToast, dismissToast, toasts}}>
		{props.children}
	</NotificationsContext.Provider>
}

export default NotificationsContext;