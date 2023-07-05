import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header({ type }) {
	const active = 'on';
	return (
		<header id='header' className={type}>
			<div className='wrap'>
				<h1>
					<Link to='index'>LOGO</Link>
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
					</ul>
					<ul id='search' className='clearfix'>
						<li>
							<NavLink to='/signup' activeClassName={active}>
								SIGN-UP
							</NavLink>
						</li>
						<li>
							<NavLink to='#'>FIND A DESTINATION </NavLink>
						</li>
						<li>
							<FontAwesomeIcon className='btnCall' icon={faBars} />
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;
