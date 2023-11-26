const mongoose = require('mongoose');
const schema = mongoose.Schema({
	fullName: String,
	email: String,
	phone: String,
	text: String,
	dateCreated: String,
	author: String,
	status: Number
}, {
	minimize: false
});


module.exports = mongoose.model('Request', schema);
