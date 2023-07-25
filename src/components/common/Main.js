import React from 'react';
import Header from './Header';
import Visual from '../main/Visual';
import Choice from '../main/Choice';
import Diary from '../main/Diary';
import Accessory from '../main/Accessory';

function Main({ menu }) {
	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
			<Choice />
			<Diary />
			<Accessory />
		</main>
	);
}

export default Main;
