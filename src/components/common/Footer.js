import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Footer() {
	const president = useSelector((store) =>
		store.memberReducer.find((member) => member.position === 'President')
	);

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
			<p>
				This Institute was established by <strong>{president.name}</strong> in 1995
			</p>
		</footer>
	);
}

export default Footer;
