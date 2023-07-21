import React, { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useImperativeHandle } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Menu = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!open) };
	});
	// 브라우저 리사이즈시
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) setOpen(false);
		});
	});

	return (
		<>
			{open && (
				<nav id='mobilePanel' onClick={() => setOpen(false)}>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>
					<li>
						<NavLink to='/department'>Depoartment</NavLink>
					</li>
					<li>
						<NavLink to='/gallery'>Gallery</NavLink>
					</li>
					<li>
						<NavLink to='/youtube'>Youtube</NavLink>
					</li>
					<li>
						<NavLink to='/community'>Community</NavLink>
					</li>
					<li>
						<NavLink to='/contact'>Contact</NavLink>
					</li>
				</nav>
			)}
		</>
	);
});

export default Menu;
