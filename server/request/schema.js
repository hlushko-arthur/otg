const mongoose = require('mongoose');
const schema = mongoose.Schema({
	fullName: String,
	email: String,
	phone: String,
	text: String,
	dateCreated: String,
	author: String
}, {
	minimize: false
});


module.exports = mongoose.model('Request', schema);
