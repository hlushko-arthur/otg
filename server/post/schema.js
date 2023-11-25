const mongoose = require('mongoose');
const schema = mongoose.Schema({
	content: String,
	type: String,
	dateCreated: String
}, {
	minimize: false
});


module.exports = mongoose.model('Post', schema);
