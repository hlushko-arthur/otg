const AdministrativeService = require('./schema');
const mongoose = require('mongoose');
const nJwt = require('njwt');
const nodemailer = require("nodemailer");

module.exports = async waw => {
	const transporter = nodemailer.createTransport({
		secure: waw.config.mail.secure,
		service: 'Gmail',
		auth: {
			user: waw.config.mail.auth.user,
			pass: waw.config.mail.auth.pass
		}
	});

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

	const router = waw.router('/api/administrativeService');

	router.post('/create', async (req, res) => {
		try {
			await AdministrativeService.create({ ...req.body, status: 0 });

			res.status(200).json({ status: true });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.get('/get', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const administrativeServices = await AdministrativeService.find();

			res.status(200).json({ status: true, data: (administrativeServices || []).reverse() });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/delete', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const deletedAdministrativeService = await AdministrativeService.findOneAndDelete({
				_id: req.body._id
			});

			if (!deletedAdministrativeService) {
				return res.status(404).json({ status: false, message: 'Administrative service not found' });
			}

			res.status(200).json({ status: true, message: 'Administrative service deleted successfully' });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/changeStatus', async (req, res) => {
		try {
			await verifyAccess(req, res);

			const updatedAdministrativeService = await AdministrativeService.updateOne({ _id: req.body._id }, {
				status: req.body.status
			});

			if (updatedAdministrativeService.n === 0) {
				return res.status(404).json({ status: false, message: 'Administrative service not found' });
			}

			res.status(200).json({
				status: true,
				data: updatedAdministrativeService,
			});
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	})

	router.post('/sendAnswer', async (req, res) => {
		try {
			await verifyAccess(req, res);

			await sendEmail(req.body.email, req.body.answer);

			const updatedAdministrativeService = await AdministrativeService.updateOne({ _id: req.body._id }, {
				answer: req.body.answer
			});

			if (updatedAdministrativeService.n === 0) {
				return res.status(404).json({ status: false, message: 'Administrative service not found' });
			}

			res.status(200).json({
				status: true,
				data: updatedAdministrativeService,
			});
		} catch (error) {
			console.log('1111111111111', error);
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

	const sendEmail = async (email, body) => {
		try {
			await new Promise((resolve, reject) => {
				transporter.sendMail({
					from: waw.config.mail.from,
					subject: 'OTG | Відповідь на Ваше звернення',
					to: email,
					html: body
				}, (resp) => {
					if (resp instanceof Error) {
						reject(resp.message);
					}
					resolve();
				});
			})
		} catch (error) {
			throw new Error(error.message || error || 'Failed to send email');
		}
	}
};
