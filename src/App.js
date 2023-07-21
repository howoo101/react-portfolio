import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';

// common
import Main from './components/common/Main';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// sub
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Contact from './components/sub/Contact';
import Community from './components/sub/Community';
import Signup from './components/sub/Signup';
import { useRef } from 'react';
import Menu from './components/common/Menu';

function App() {
	const menu = useRef(null);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />

				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/community' component={Community} />
			<Route path='/signup' component={Signup} />
			<Footer />
			<Menu ref={menu} />
		</>
	);
}

export default App;
