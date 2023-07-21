import React from 'react';
import Header from './Header';
import Visual from '../main/Visual';

function Main({ menu }) {
	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
		</main>
	);
}

export default Main;
