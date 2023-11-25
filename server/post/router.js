const Post = require('./schema');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const nJwt = require('njwt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports = async waw => {
	if (!waw.config.signingKey) {
		waw.config.signingKey = uuidv4();

		let serverJson = waw.readJson(process.cwd() + '/server.json');

		serverJson.signingKey = waw.config.signingKey;

		waw.writeJson(process.cwd() + '/server.json', serverJson);
	}

	if (mongoose.connection.readyState == 0) {
		mongoose.connect(waw.mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});

		mongoose.Promise = global.Promise;
	}

	/*
	*	Initialize User and Mongoose
	*/
	const router = waw.router('/api/post');

	router.post('/create', (req, res) => {
		Post.create(req.body);
	})

	router.get('/get/:tab', async (req, res) => {
		const posts = await Post.find({
			type: req.params.tab
		});
		res.status(200).json({ status: 200, data: posts });
	})

	waw.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});


};
