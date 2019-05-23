/* This sends back the user's json web token so it can
be used on the front end and to access protected routes */

/* "A middleware function is a function that has access
to the request response cycle" - Brad Traversy */

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
	//Get token from header
	const token = req.header("x-auth-token");

	//Check if no token
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}

	//Verify token
	try {
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		/* Decoded receives a user object because we added a 
        user object to our payload. Set req.user to that object
        so it can be used elsewhere in the application */
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
