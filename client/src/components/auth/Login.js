import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	//first arg: state object
	//second arg: equivalent to this.setState({ state });
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const { email, password } = formData;

	const onChange = event =>
		setFormData({ ...formData, [event.target.name]: event.target.value });

	const onSubmit = async event => {
		event.preventDefault(); //keep page from reloading
		console.log("SUCCESS");
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Sign Into Your Account
			</p>
			<form className='form' onSubmit={event => onSubmit(event)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={event => onChange(event)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={event => onChange(event)}
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	);
};

export default Login;
