const mongoose = require('mongoose');
const schema = mongoose.Schema({
	fullName: String,
	email: String,
	phone: String,
	text: String,
	dateCreated: String,
	birthday: String,
	author: String,
	status: Number,
	answer: String,
	extract: String
}, {
	minimize: false
});


module.exports = mongoose.model('AdministrativeService', schema);
