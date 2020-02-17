import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import axios from 'axios';

export default class LoginPage extends Component {
	state = {
		email: '',
		password: ''
	};

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			console.log('Sending..', this.state);
			const loggedInUser = await axios.post(
				'/api/v1/auth/login',
				this.state
			);
			console.log(loggedInUser);
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<Container>
				<h1 className='display-3 text-center'>Login to your account</h1>
				<hr className='my-5' />
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							name='email'
							value={this.state.email}
							onChange={this.handleChange}
						/>
						<Form.Text className='text-muted'>
							This will be the email address we will contact you
							on.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='text'
							placeholder='Password'
							name='password'
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Container>
		);
	}
}
