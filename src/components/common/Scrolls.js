import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Anime from '../../asset/anime';

function Scrolls({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef([]);
	const [Num, setNum] = useState(0);
	const baseline = -window.innerHeight / 4;

	const moveSection = useCallback(
		(idx) => {
			const scrollButtons = btnRef.current.parentElement.querySelectorAll('#naviScroll li');
			const sections = btnRef.current.parentElement.querySelectorAll('.naviScroll');

			let lastMove = 0;
			if (idx === scrollButtons.length - 1) lastMove = 250;
			new Anime(window, {
				prop: 'scroll',
				value: sections[idx].offsetTop + baseline + lastMove,
				duration: 500,
			});
		},
		[baseline]
	);

	const moveAuto = useCallback(
		(e) => {
			e.preventDefault();
			const scrollButtons = btnRef.current.parentElement.querySelectorAll('#naviScroll li');
			const activeIdx = Array.from(scrollButtons).findIndex((el) =>
				el.className.includes('on')
			);

			if (e.deltaY > 0) {
				if (activeIdx === scrollButtons.length - 1) return;
				moveSection(activeIdx + 1);
			} else {
				if (activeIdx === 0) return;
				moveSection(activeIdx - 1);
			}
		},
		[moveSection]
	);

	const getPos = useCallback(() => {
		pos.current = [];
		const sections = btnRef.current.parentElement.querySelectorAll('.naviScroll');
		for (const sec of sections) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.naviScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	}, [setScrolled]);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		window.addEventListener('mousewheel', moveAuto, { passive: false });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			window.removeEventListener('mousewheel', moveAuto, { passive: false });
		};
	}, [getPos, activation, moveAuto]);

	return (
		<ul id='naviScroll' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';
					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default memo(Scrolls);
