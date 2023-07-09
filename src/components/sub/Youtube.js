import Layout from '../common/Layout';
import { config } from '../../asset/apikey';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Youtube() {
	const [videos, setVideos] = useState([]);

	async function getData() {
		const apiKey = config.youtubeApiKey;
		const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;

		const json = (await axios.get(url)).data.items;

		setVideos(json);
	}
	useEffect(() => {
		getData();
	}, []);
	return (
		<Layout name={'Youtube'}>
			<div className='wrap'>
				{videos.map((item, idx) => {
					let tit = item.snippet.title;
					let desc = item.snippet.description;
					let date = item.snippet.publishedAt;

					return (
						<article key={idx}>
							<h2>{tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
							<div className='txt'>
								<p>{desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
								<span>${date.split('T')[0].split('-').join('.')}</span>
							</div>
							<div className='pic'>
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
	);
}

export default Youtube;
