import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';

function Header({ type }) {
	const active = 'on';

	const toggleMenu = useRef(null);
	return (
		<>
			<header id='header' className={type}>
				<div className='wrap'>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>
					<nav>
						<ul id='gnb' className='clearfix'>
							<li>
								<NavLink to='/department' activeClassName={active}>
									DEPARTMENT{' '}
								</NavLink>
							</li>
							<li>
								<NavLink to='/gallery' activeClassName={active}>
									GALLERY
								</NavLink>
							</li>
							<li>
								<NavLink to='/youtube' activeClassName={active}>
									YOUTUBE
								</NavLink>
							</li>
							<li>
								<NavLink to='/contact' activeClassName={active}>
									CONTACT
								</NavLink>
							</li>
							<li>
								<NavLink to='/community' activeClassName={active}>
									Community
								</NavLink>
							</li>
						</ul>
						<ul id='search' className='clearfix'>
							<li>
								<NavLink to='/signup' activeClassName={active}>
									SIGN-UP
								</NavLink>
							</li>
							<li>
								<NavLink to='#'>FIND A DESTINATION </NavLink>
								<NavLink to='#'>
									<FontAwesomeIcon icon={faMagnifyingGlass} />
								</NavLink>
							</li>
						</ul>
					</nav>

					<FontAwesomeIcon
						className='btnCall'
						icon={faBars}
						onClick={() => {
							toggleMenu.current.toggle();
						}}
					/>
				</div>
			</header>
			<Menu ref={toggleMenu} />
		</>
	);
}

export default Header;
