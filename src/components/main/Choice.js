import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Choice() {
	return (
		<section id='choice' className='naviScroll on'>
			<div className='inner'>
				<h1>travler's choice</h1>
				<div className='wrap'>
					<article>
						<img src={process.env.PUBLIC_URL + '/imgs/choice1.jpg'} alt='배경1' />
						<a className='icon' href='/'>
							<FontAwesomeIcon icon={faPlus} />
						</a>
						<p>S</p>
					</article>
					<article>
						<img src={process.env.PUBLIC_URL + '/imgs/choice2.jpg'} alt='배경2' />
						<a className='icon' href='/'>
							<FontAwesomeIcon icon={faPlus} />
						</a>
						<p>M</p>
					</article>
					<article>
						<img src={process.env.PUBLIC_URL + '/imgs/choice1.jpg'} alt='배경3' />
						<a className='icon' href='/'>
							<FontAwesomeIcon icon={faPlus} />
						</a>
						<p>N</p>
					</article>
				</div>
				<a href='/' className='btn'>
					More Desitnation
				</a>
			</div>
		</section>
	);
}

export default Choice;
