import React from 'react';
import { Link } from 'react-router-dom';

export default function FloatButton({ label }) {
	return (
		<Link to="/notes/new" className="btn-float">
			{label}
		</Link>
	);
}
