const mongoose = require("mongoose");

/* Create the user schema */
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		/* Ensure that two users can't have same email */
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	/* Avatar will come from gravatar */
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

/* Export a user variable that is assigned to the mongoose model we created */
/* First arg: model name. Second arg: Schema */
module.exports = User = mongoose.model("user", UserSchema);
