import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Header = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Navbar.Brand href='#home'>ABC Bank</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link href='#home'>Home</Nav.Link>
					<Nav.Link href='#link'>Account</Nav.Link>
				</Nav>
				<NavDropdown title='Profile' id='basic-nav-dropdown'>
					<NavDropdown.Item href='#action/3.1'>
						Edit Profile
					</NavDropdown.Item>
					<NavDropdown.Item href='#action/3.2'>
						View Profile
					</NavDropdown.Item>
					<NavDropdown.Item href='#action/3.3'>
						Something
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='#action/3.4'>
						Logout
					</NavDropdown.Item>
				</NavDropdown>
				<Form inline>
					<FormControl
						type='text'
						placeholder='Search'
						className='mr-sm-2'
					/>
					<Button variant='outline-success'>Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
