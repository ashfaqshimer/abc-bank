import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import LandingPage from './pages/Landing/LandingPage';
import RegistrationPage from './pages/Registration/RegistrationPage';

function App() {
	return (
		<Router>
			<div className='App'>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/register' component={RegistrationPage} />
			</div>
		</Router>
	);
}

export default App;
