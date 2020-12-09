const key = 'notes-app-logs';

export function writeLine(line) {
	const preWritten = readLines();
	const logsWithNewLine = preWritten ? `${preWritten}\n` : '';
	localStorage.setItem(key, `${logsWithNewLine}${line}`);
}

export function readLines() {
	return localStorage.getItem(key);
}

export function clearLogs() {
	localStorage.removeItem(key);
}