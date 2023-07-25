import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Accessory() {
	const [tabIdx, setTabIdx] = useState(0);
	const [items, setItems] = useState([]);

	async function getData() {
		const json = (await axios.get(`${process.env.PUBLIC_URL}/DB/accessory.json`)).data.items;

		setItems(json);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<section id='accessory' className='naviScroll'>
			<h1>
				traveling <span>accesssories</span>
			</h1>

			<div id='tab' className='inner'>
				<ul className='tab_buttons'>
					{items &&
						items.map((data, idx) => {
							return (
								<li
									key={idx}
									className={idx === tabIdx ? 'on' : ''}
									onClick={(e) => {
										setTabIdx(idx);
									}}
								>
									{data.category}
								</li>
							);
						})}
				</ul>
				<div className='wrap'>
					{items &&
						items.map((item, categoryIdx) => {
							return (
								<div
									key={categoryIdx}
									className={
										categoryIdx === tabIdx ? 'tab_items on' : 'tab_items'
									}
								>
									{item.data.map((data, idx) => {
										return (
											<article key={idx}>
												<div className='pic'>
													<img
														src={
															process.env.PUBLIC_URL +
															`/imgs/${data.img}.png`
														}
														alt={data.title}
													/>
												</div>
												<div className='con'>
													<h2>{data.title}</h2>
													<p>${data.price}</p>
												</div>
												<a href='/' className='more'>
													<FontAwesomeIcon icon={faPlus} />
												</a>
											</article>
										);
									})}
								</div>
							);
						})}
				</div>

				<a href='/' className='store'>
					Go to store <FontAwesomeIcon icon={faArrowRight} />
				</a>
			</div>
		</section>
	);
}

export default Accessory;
