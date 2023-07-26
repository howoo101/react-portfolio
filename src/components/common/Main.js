import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from './Header';
import Visual from '../main/Visual';
import Choice from '../main/Choice';
import Diary from '../main/Diary';
import Accessory from '../main/Accessory';
import Scrolls from './Scrolls';

function Main({ menu }) {
	const [scrolled, setScrolled] = useState(0);
	const [pos, setPos] = useState([]);
	const mainRef = useRef(null);

	const activeHeader = useCallback(() => {
		const header = mainRef.current.querySelector('#header');

		const scroll = window.scrollY;

		header.classList.remove('on');
		header.classList.remove('off');

		scroll > 0 ? header.classList.add('on') : header.classList.add('off');
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', activeHeader);
		return () => {
			window.removeEventListener('scroll', activeHeader);
		};
	}, [activeHeader]);
	return (
		<main ref={mainRef}>
			<Header type={'main'} menu={menu} />
			<Visual />
			<Choice />
			<Diary />
			<Accessory />
			<Scrolls setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
