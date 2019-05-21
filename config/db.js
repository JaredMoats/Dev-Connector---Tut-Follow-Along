/* This file exports a function that allows us
to connect to the mongoDB server */

const mongoose = require('mongoose');
const config = require('config');
//pull in the mongo URI in default.json (using config dev dependency)
const db = config.get('mongoURI');

//connect to mongodb. async await function is the new standard
const connectDB = async () => {
    try{
        /* Add await keyword since this returns a promise (waiting for promise) */
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB Connected...");
    } catch(err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;