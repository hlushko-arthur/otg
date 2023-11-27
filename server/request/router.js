const Request = require('./schema');
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

	const router = waw.router('/api/request');

	router.post('/create', async (req, res) => {
		try {
			await Request.create({ ...req.body, status: 0 });

			res.status(200).json({ status: true });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.get('/get', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const requests = await Request.find();

			res.status(200).json({ status: true, data: (requests || []).reverse() });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/delete', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const deletedRequest = await Request.findOneAndDelete({
				_id: req.body._id
			});

			if (!deletedRequest) {
				return res.status(404).json({ status: false, message: 'Request not found' });
			}

			res.status(200).json({ status: true, message: 'Request deleted successfully' });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/changeStatus', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const updatedRequest = await Request.updateOne({ _id: req.body._id }, {
				status: req.body.status
			});

			if (updatedRequest.n === 0) {
				return res.status(404).json({ status: false, message: 'Request not found' });
			}

			res.status(200).json({
				status: true,
				data: updatedRequest,
			});
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/sendAnswer', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const updatedRequest = await Request.updateOne({ _id: req.body._id }, {
				answer: req.body.answer
			});

			if (updatedRequest.n === 0) {
				return res.status(404).json({ status: false, message: 'Request not found' });
			}

			res.status(200).json({
				status: true,
				data: updatedRequest,
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
