import Layout from '../common/Layout';

import { useRef, useState } from 'react';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';

function Youtube() {
	const modal = useRef(null);
	const [index, setIndex] = useState(0);

	const videos = useSelector((store) => store.youtubeReducer.youtube);

	return (
		<>
			<Layout name={'Youtube'}>
				<div className='wrap'>
					{videos &&
						videos.map((item, idx) => {
							let tit = item.snippet.title;
							let desc = item.snippet.description;
							let date = item.snippet.publishedAt;

							return (
								<article key={idx}>
									<h2>{tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
									<div className='txt'>
										<p>
											{desc.length > 200 ? desc.substr(0, 200) + '...' : desc}
										</p>
										<span>${date.split('T')[0].split('-').join('.')}</span>
									</div>
									<div
										className='pic'
										onClick={() => {
											modal.current.open();
											setIndex(idx);
										}}
									>
										<img
											className='thumbnail'
											src={item.snippet.thumbnails.standard.url}
											alt={item.snippet.resourceId.videoId}
										/>
									</div>
								</article>
							);
						})}
				</div>
			</Layout>
			<Modal ref={modal}>
				<iframe
					title={videos && videos[index]?.id}
					src={`https://www.youtube.com/embed/${
						videos && videos[index]?.snippet.resourceId.videoId
					}`}
				></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
