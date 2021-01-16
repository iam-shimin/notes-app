import React from 'react';
import { Link } from 'react-router-dom';

interface FloatButtonProps {
	label: string
};

export default function FloatButton({ label }: FloatButtonProps) {
	return (
		<Link to="/notes/new" className="btn-float">
			{label}
		</Link>
	);
}
