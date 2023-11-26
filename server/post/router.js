const Post = require('./schema');
const mongoose = require('mongoose');
const nJwt = require('njwt');

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

	const router = waw.router('/api/post');

	router.post('/create', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const createdPost = await Post.create(req.body);

			res.status(200).json({ status: true, data: [createdPost] });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.get('/get/:tab', async (req, res) => {
		try {
			const posts = await Post.find({
				type: req.params.tab
			});

			res.status(200).json({ status: true, data: (posts || []).reverse() });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/delete', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const deletedPost = await Post.findOneAndDelete({
				_id: req.body._id
			});

			if (!deletedPost) {
				return res.status(404).json({ status: false, message: 'Post not found' });
			}

			res.status(200).json({ status: true, message: 'Post deleted successfully' });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/update', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const updatedPost = await Post.updateOne({ _id: req.body._id }, {
				content: req.body.content
			});

			if (updatedPost.n === 0) {
				return res.status(404).json({ status: false, message: 'Post not found' });
			}

			res.status(200).json({
				status: true,
				data: [updatedPost],
			});
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	waw.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	const verifyToken = async (req, res) => {
		if (!req.cookies.Authorization) {
			throw new Error('Unauthorized');
		}

		try {
			await new Promise((resolve, reject) => {
				nJwt.verify(req.cookies.Authorization, waw.config.signingKey, (err) => {
					if (err) {
						if (err.message === 'Jwt is expired') {
							return reject(new Error('Token expired'));
						} else {
							return reject(new Error('Invalid token'));
						}
					}

					resolve();
				});
			});
		} catch (error) {
			throw new Error(error.message || 'Invalid token');
		}
	};

	const verifyAccess = async (req, res) => {
		await verifyToken(req, res);

		const jwt = nJwt.verify(req.cookies.Authorization, waw.config.signingKey);

		if (jwt.body.admin) {
			return true;
		} else {
			throw new Error('No Access');
		}
	}
};
