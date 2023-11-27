const mongoose = require('mongoose');
const schema = mongoose.Schema({
	fullName: String,
	email: String,
	phone: String,
	text: String,
	dateCreated: String,
	author: String,
	status: Number,
	answer: String
}, {
	minimize: false
});


module.exports = mongoose.model('Request', schema);
