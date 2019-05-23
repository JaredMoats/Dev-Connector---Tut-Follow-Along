const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
/* Import validation middleware */
const { check, validationResult } = require("express-validator/check");

//Pull in user model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
	"/",
	//Implement validation checks
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		//If there are errors
		if (!errors.isEmpty()) {
			/* Send a json object containing an array of errors */
			return res.status(400).json({ errors: errors.array() });
		}

		//destructure req.body (i.e. req.body.name, req.body.email, etc.)
		const { name, email, password } = req.body;

		try {
			//See if user exists
			let user = await User.findOne({ email });

			/* If the user exists, return error with JSON */
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists" }] });
			}
			//Get user's gravatar
			const avatar = gravatar.url(email, {
				//size
				s: "200",
				//rating
				r: "pg",
				//default image if user does not have gravatar
				d: "mm"
			});

			//create instance of a user (does not save the user)

			user = new User({
				name,
				email,
				avatar,
				password
			});

			//Encrypt password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			//save user to database
			await user.save();

			//Return the jsonwebtoken
			res.send("User registered");
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
