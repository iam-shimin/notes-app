import { useEffect, useState } from 'react';

export default function useMatchMedia(media = '(max-width: 500px)') {

	const matchMedia = window.matchMedia(media);
	const [isMatch, setIsMatch] = useState(matchMedia.matches);

	useEffect(() => {
		function updateFlag(event) {
			setIsMatch(event.matches);
		}
		matchMedia.addEventListener('change', updateFlag);
		return () => matchMedia.removeEventListener('change', updateFlag);
	}, [matchMedia]);

	return isMatch;
}