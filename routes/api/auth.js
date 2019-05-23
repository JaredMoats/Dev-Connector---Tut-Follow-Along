const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
/* Import validation middleware */
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post(
	"/",
	//Implement validation checks
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		//If there are errors
		if (!errors.isEmpty()) {
			/* Send a json object containing an array of errors */
			return res.status(400).json({ errors: errors.array() });
		}

		//destructure req.body (i.e. req.body.email, etc.)
		const { email, password } = req.body;

		try {
			//See if user exists
			let user = await User.findOne({ email });

			/* If the user exists, return error with JSON */
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			//Return the jsonwebtoken
			const payload = {
				user: {
					//mongodb automatically generates the user id.
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
