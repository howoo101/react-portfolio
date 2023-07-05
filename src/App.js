import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';

// common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// sub
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Contact from './components/sub/Contact';
import Community from './components/sub/Community';
import Signup from './components/sub/Signup';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Header type={'main'} />
				</Route>
				<Route path='/'>
					{/* 서브전용 라우터에는 sub문자값을 전달 */}
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='./department' component={Department} />
			<Route path='./gallery' component={Gallery} />
			<Route path='./youtube' component={Youtube} />
			<Route path='./contact' component={Contact} />
			<Route path='./contact' component={Community} />
			<Route path='./signup' component={Signup} />
			<Footer />
		</>
	);
}

export default App;
