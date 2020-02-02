import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class RegistrationPage extends Component {
	state = {
		email: '',
		name: '',
		address: '',
		number: '',
		nic: ''
	};

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	render() {
		return (
			<Container>
				<h1 className='display-3 text-center'>Register with us</h1>
				<hr className='my-5' />
				<Form>
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

					<Form.Group controlId='formBasicName'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Name'
							name='name'
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicAddress'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Address'
							name='address'
							value={this.state.address}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group controlId='formBasicContact'>
						<Form.Label>Contact Number</Form.Label>
						<Form.Control
							type='text'
							placeholder='Contact Number'
							name='number'
							value={this.state.number}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group controlId='formBasicNIC'>
						<Form.Label>NIC Number</Form.Label>
						<Form.Control
							type='text'
							placeholder='NIC Number'
							name='nic'
							value={this.state.nic}
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
