const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const schema = mongoose.Schema({
	login: { type: String, unique: true, sparse: true, trim: true },
	admin: Boolean,
	password: String,
}, {
	minimize: false
});

schema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

schema.methods.create = function (obj, user, sd) {
	this.thumb = obj.thumb || '/assets/default.png';
	this.reg_email = obj.email;
	this.email = obj.email;
	this.name = obj.name;
	this.data = {};
	this.is = {}
}

module.exports = mongoose.model('User', schema);
