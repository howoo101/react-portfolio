import React from 'react';

function Visual() {
	return (
		<figure id='visual' className='naviScroll'>
			<section className='lower'>
				<h2>The great outdoors</h2>
				<p>travel with pleasure</p>
			</section>

			<section className='upper'>
				<video src={process.env.PUBLIC_URL + '/imgs/main.mp4'} loop autoPlay muted></video>
			</section>
		</figure>
	);
}

export default Visual;
