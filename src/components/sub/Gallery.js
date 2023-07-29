import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { useCallback, useEffect, useRef, useState } from 'react';
import { config } from '../../asset/apikey';
import Modal from '../common/Modal';

function Gallery() {
	const modal = useRef(null);
	const [index, setIndex] = useState(0);
	const [loader, setLoader] = useState(true);
	const [items, setItems] = useState([]);
	const userId = config.flickrUserId;
	const isSameUser = useRef(true);

	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);

	const getFlickr = useCallback(
		async (opt) => {
			const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
			const key = config.flickrApiKey;
			const method_interest = 'flickr.interestingness.getList';
			const method_user = 'flickr.people.getPhotos';
			const method_search = 'flickr.photos.search';
			const num = 40;
			let url = '';

			if (opt.type === 'interest')
				url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
			if (opt.type === 'search')
				url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
			if (opt.type === 'user')
				url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

			const result = await axios.get(url);
			const data = result.data.photos.photo;
			if (data.length === 0) {
				setLoader(false);

				frame.current.classList.add('on');
				const btnMine = btnSet.current.children;
				btnMine[1].classList.add('on');
				getFlickr({ type: 'user', user: userId });
				enableEvent.current = true;

				return alert('이미지 결과값이 없습니다.');
			}

			setItems(data);
			//외부데이터가 State에 담기고 DOM이 생성되는 순간
			//모든 img요소를 찾아서 반복처리
			const imgs = frame.current.querySelectorAll('img');

			let counter = 0;
			if (!imgs) return;

			imgs.forEach((img) => {
				img.onload = () => {
					++counter;

					if (counter === imgs.length - 2) {
						setLoader(false);
						frame.current.classList.add('on');
						enableEvent.current = true;
					}
				};
			});
		},
		[userId]
	);

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		getFlickr({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isSameUser.current = false;
	};

	const showInterest = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;
		//기존 갤러리 초기화 함수 호출
		resetGallery(e);
		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'interest' });
		isSameUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;
		//기존 갤러리 초기화 함수 호출
		resetGallery(e);
		//새로운 데이터로 갤러리 생성 함수 호출
		getFlickr({ type: 'user', user: userId });
	};

	//기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
		isSameUser.current = false;
	};

	useEffect(() => {
		getFlickr({ type: 'user', user: userId });
	}, [getFlickr, userId]);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='btnSet' ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>
					<button className='on' onClick={showMine}>
						My Gallery
					</button>
				</div>

				<div className='searchBox'>
					<input
						type='text'
						id='search'
						placeholder='검색어 입력'
						ref={searchInput}
						onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
					/>
					<button className='searchBtn' onClick={showSearch}>
						Seach
					</button>
				</div>
				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{items?.map((item, idx) => {
							return (
								<article key={idx}>
									<div
										className='picture'
										onClick={() => {
											modal.current.open();
											setIndex(idx);
										}}
									>
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
											onError={(e) =>
												e.target.setAttribute(
													'src',
													'https://www.flickr.com/images/buddyicon.gif'
												)
											}
										/>
										<span
											onClick={(e) => {
												console.log(e.target.innerText);
												if (isSameUser.current) return;
												isSameUser.current = true;
												setLoader(true);
												frame.current.classList.remove('on');
												getFlickr({
													type: 'user',
													user: e.target.innerText,
												});
											}}
										>
											{item.owner}
										</span>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>

				{loader && (
					<img
						src={`${process.env.PUBLIC_URL}/imgs/bono.gif`}
						alt='loading'
						className='loading'
					/>
				)}
			</Layout>
			<Modal ref={modal}>
				<img
					src={`https://live.staticflickr.com/${items[index]?.server}/${items[index]?.id}_${items[index]?.secret}_b.jpg`}
					alt={items[index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
