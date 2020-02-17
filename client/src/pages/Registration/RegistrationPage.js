import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';

export default class RegistrationPage extends Component {
	state = {
		form: {
			email: '',
			name: '',
			address: '',
			contactNumber: '',
			nicNumber: ''
		},
		isLoading: false,
		errors: []
	};

	handleChange = (evt) => {
		this.setState({
			form: { ...this.state.form, [evt.target.name]: evt.target.value }
		});
	};

	handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			console.log('Sending..', this.state);
			this.setState({ isLoading: true });
			const registeredUser = await axios.post(
				'/api/v1/customers',
				this.state.form
			);
			console.log(registeredUser);
		} catch (err) {
			const errorMsgs = [];
			console.error(err.response.status);
			if (err.response.status === 409) {
				const { errors } = err.response.data;
				Object.keys(errors).forEach((error) =>
					errorMsgs.push(`Duplicate ${error} entered`)
				);
			}
			this.setState({ errors: errorMsgs });
		} finally {
			this.setState({ isLoading: false });
		}
	};

	render() {
		let messages;
		const { errors } = this.state;
		if (errors.length) {
			messages = errors.map((error, indx) => (
				<Alert className='my-3 p-3' key={indx} variant='danger'>
					{error}
				</Alert>
			));
		}
		return (
			<Container className='p-3'>
				<h1 className='display-3 text-center'>Register with us</h1>
				<hr className='my-5' />
				{!this.state.isLoading ? (
					<>
						{messages ? messages : null}
						<Form onSubmit={this.handleSubmit}>
							<Form.Group controlId='formBasicEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									name='email'
									value={this.state.form.email}
									onChange={this.handleChange}
								/>
								<Form.Text className='text-muted'>
									This will be the email address we will
									contact you on.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId='formBasicName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Name'
									name='name'
									value={this.state.form.name}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group controlId='formBasicAddress'>
								<Form.Label>Address</Form.Label>
								<Form.Control
									type='text'
									placeholder='Address'
									name='address'
									value={this.state.form.address}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group controlId='formBasicContact'>
								<Form.Label>Contact Number</Form.Label>
								<Form.Control
									type='text'
									placeholder='Contact Number'
									name='contactNumber'
									value={this.state.form.contactNumber}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group controlId='formBasicNIC'>
								<Form.Label>NIC Number</Form.Label>
								<Form.Control
									type='text'
									placeholder='NIC Number'
									name='nicNumber'
									value={this.state.form.nicNumber}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Button variant='primary' type='submit'>
								Submit
							</Button>
						</Form>
					</>
				) : (
					<h1>Loading..</h1>
				)}
			</Container>
		);
	}
}
