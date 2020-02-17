import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import LandingPage from './pages/Landing/LandingPage';
import RegistrationPage from './pages/Registration/RegistrationPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
	return (
		<Router>
			<div className='App'>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/register' component={RegistrationPage} />
				<Route exact path='/login' component={LoginPage} />
			</div>
		</Router>
	);
}

export default App;
