import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer>
			<div className='inner clearfix'>
				<Link to='#' className='copy'>
					<span>COPYRIGHT &copy 2023 ALL RIGHTS RESERVED</span>
				</Link>
				<ul className='wrap link clearfix'>
					<li>
						<Link to='#'>Depoartment</Link>
					</li>
					<li>
						<Link to='#'>Gallery</Link>
					</li>
					<li>
						<Link to='#'>Youtube</Link>
					</li>
					<li>
						<Link to='#'>Community</Link>
					</li>
					<li>
						<Link to='#'>Contact</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
