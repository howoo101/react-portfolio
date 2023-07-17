import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { useCallback, useEffect, useRef, useState } from 'react';
import { config } from '../../asset/apikey';
function Gallery() {
	const [loader, setLoader] = useState(true);
	const [items, setItems] = useState([]);
	const userId = config.flickrUserId;

	const frame = useRef(null);
	const counter = useRef(0);

	const getFlickr = useCallback(async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = config.flickrApiKey;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 40;
		let url = '';

		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);

		setItems(result.data.photos.photo);
		//외부데이터가 State에 담기고 DOM이 생성되는 순간
		//모든 img요소를 찾아서 반복처리
		const imgs = frame.current.querySelectorAll('img');

		counter.current = 0;
		console.log(imgs);
		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length) {
					setLoader(false);
					frame.current.classList.add('on');
				}
			};
		});
	}, []);

	useEffect(() => {
		getFlickr({ type: 'interest' });
	}, [getFlickr]);

	return (
		<Layout name={'Gallery'}>
			<div className='searchBox'>
				<input type='text' id='search' placeholder='검색어 입력' />
				<button className='searchBtn'>Search</button>
			</div>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{items?.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='picture'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										alt={item.title}
									/>
								</div>
								<p>{item.title}</p>
								<div className='profile'>
									<img
										src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
										alt={item.owner}
										onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
									/>
									<span>{item.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>

			{loader && <img src={`${process.env.PUBLIC_URL}/imgs/bono.gif`} alt='loading' className='loading' />}
		</Layout>
	);
}

export default Gallery;
