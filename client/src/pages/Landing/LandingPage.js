import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';

import './LandingPage.scss';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
	render() {
		return (
			<div className='LandingPage'>
				<div className='cover-container d-flex h-100 p-3 mx-auto flex-column'>
					<header className='masthead mb-auto'>
						<div className='inner'>
							<h3 className='masthead-brand'>
								<FontAwesomeIcon icon={faUniversity} />
								ABC Bank
							</h3>
							<nav className='nav nav-masthead justify-content-center'>
								<Link className='nav-link active' to='/'>
									Home
								</Link>
								<Link className='nav-link' to='/register'>
									Register
								</Link>
								<Link className='nav-link' to='#'>
									Sign In
								</Link>
							</nav>
						</div>
					</header>

					<main role='main' className='inner cover'>
						<h1 className='cover-heading'>Connecting customers.</h1>
						<p className='lead'>
							ABC is one of the world’s largest banking and
							financial services organisations. Our four global
							businesses serve more than 40 million customers
							worldwide through a network that covers 65 countries
							and territories. Register with us and we'll get in
							touch with you.
						</p>
						<p className='lead'>
							<Link
								to='/register'
								className='btn btn-lg btn-secondary'
							>
								Register
							</Link>
						</p>
					</main>

					<footer className='mastfoot mt-auto'>
						<div className='inner'>
							<p>
								All rights reserved ABC Banking Pvt. Ltd. 2020
							</p>
						</div>
					</footer>
				</div>
			</div>
		);
	}
}
