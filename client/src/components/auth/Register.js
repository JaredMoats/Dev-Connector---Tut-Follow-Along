import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

//destructuring props in argument field
const Register = ({ setAlert }) => {
	//first arg: state object
	//second arg: equivalent to this.setState({ state });
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});

	const { name, email, password, password2 } = formData;

	const onChange = event =>
		setFormData({ ...formData, [event.target.name]: event.target.value });

	const onSubmit = async event => {
		event.preventDefault(); //keep page from reloading
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			console.log("SUCCESS");
		}
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
			</p>
			<form className='form' onSubmit={event => onSubmit(event)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={event => onChange(event)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={event => onChange(event)}
						required
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
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
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						value={password2}
						onChange={event => onChange(event)}
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired
};

export default connect(
	null,
	{ setAlert }
)(Register);
