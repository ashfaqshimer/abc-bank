import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class RegistrationPage extends Component {
	state = {
		email: ''
	};

	handleChange = (evt) => {
		this.setState({ [evt.target]: evt.target.value });
	};

	render() {
		return (
			<Container>
				<Form>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
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
						<Form.Control type='password' placeholder='Password' />
					</Form.Group>
					<Form.Group controlId='formBasicCheckbox'>
						<Form.Check type='checkbox' label='Check me out' />
					</Form.Group>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Container>
		);
	}
}
