export function appendHeadingDelta(line: string, delta: DeltaData[]) {
	let level = 0;
	let headingText = '';
	let isBroken = false;
	line.split('').forEach(ctr => {
		if (!isBroken) {
			if (ctr === '#') {
				++level;
				return;
			} else {
				isBroken = true;
			}
		}
		headingText += ctr;
	});

	const heading: HeadingBlock = {
		type: 'heading',
		data: { headingText: headingText, level: level>6? 6: level }
	}

	return [...delta, heading];
}

export function headingToString(headingDelta: HeadingBlock['data']) {
	return '#'.repeat(headingDelta.level) + headingDelta.headingText;
}