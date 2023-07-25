import { useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function BtnRolling() {
	const btnStart = useRef(null);
	const btnStop = useRef(null);
	const swiper = useSwiper();

	return (
		<nav className='controls'>
			<FontAwesomeIcon
				className='on'
				ref={btnStart}
				icon={faPlay}
				onClick={() => {
					btnStart.current.classList.add('on');
					btnStop.current.classList.remove('on');
					swiper.autoplay.start();
				}}
			/>
			<FontAwesomeIcon
				ref={btnStop}
				icon={faPause}
				onClick={() => {
					btnStop.current.classList.add('on');
					btnStart.current.classList.remove('on');
					swiper.autoplay.stop();
				}}
			/>
		</nav>
	);
}

function Diary() {
	return (
		<section id='diary' className='naviScroll'>
			<div className='inner'>
				<h1>journey's diary</h1>
				<a href='/' className='more'>
					Explore more
				</a>
				<Swiper
					className='swiper wrap'
					modules={[Autoplay, Navigation]}
					loop={true}
					slidesPerView={3}
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{ delay: 2000, disableOnInteraction: true }}
					navigation={true}
				>
					<div className='swiper-wrapper'>
						<SwiperSlide>
							<article>
								<h2>Lorem ipsum dolor sit amet.</h2>
								<span>Lorem, ipsum dolor.</span>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Recusandae exercitationem accusantium iste?
								</p>
								<p>
									Labore officiis hic est, ex saepe vero. Vero architecto culpa
									consequuntur animi!
								</p>
							</article>
						</SwiperSlide>
						<SwiperSlide>
							<article>
								<h2>Lorem ipsum dolor sit amet.</h2>
								<span>Lorem, ipsum dolor.</span>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Recusandae exercitationem accusantium iste?
								</p>
								<p>
									Labore officiis hic est, ex saepe vero. Vero architecto culpa
									consequuntur animi!
								</p>
							</article>
						</SwiperSlide>
						<SwiperSlide>
							<article>
								<h2>Lorem ipsum dolor sit amet.</h2>
								<span>Lorem, ipsum dolor.</span>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Recusandae exercitationem accusantium iste?
								</p>
								<p>
									Labore officiis hic est, ex saepe vero. Vero architecto culpa
									consequuntur animi!
								</p>
							</article>
						</SwiperSlide>
						<SwiperSlide>
							<article>
								<h2>Lorem ipsum dolor sit amet.</h2>
								<span>Lorem, ipsum dolor.</span>
								<p>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Recusandae exercitationem accusantium iste?
								</p>
								<p>
									Labore officiis hic est, ex saepe vero. Vero architecto culpa
									consequuntur animi!
								</p>
							</article>
						</SwiperSlide>
					</div>
					<BtnRolling />
				</Swiper>
			</div>
		</section>
	);
}

export default Diary;
