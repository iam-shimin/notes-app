import React, { useEffect } from 'react';

const styles: React.CSSProperties = {
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	background: '#8888',
	opacity: 0,
	transition: 'opacity 0.1s cubic-bezier(.65,.05,.36,1) 0s'
};

const BackdropCxt = React.createContext<() => void>(() => {});

function Backdrop({ show = false }) {
	useEffect(() => {
		const bd = document.getElementById('backdrop');
		requestAnimationFrame(() => {
			if (show && bd?.style?.opacity !== undefined) {
				bd.style.opacity = '1';
			}
		})
	}, [show]);

	if (show) {
		return <div id="backdrop" style={styles}></div>
	}

	return null;
}

function BackdropProvider({ children }: React.HTMLProps<HTMLDivElement>) {
	const [isActive, setIsActive] = React.useState(false);

	const toggle = React.useCallback(() => setIsActive(current => !current), []);

	return (
		<BackdropCxt.Provider value={toggle}>
			{children}
			<Backdrop show={isActive} />
		</BackdropCxt.Provider>
	);
}

export function useBackdrop() {
	return React.useContext(BackdropCxt);
}

export default BackdropProvider;
