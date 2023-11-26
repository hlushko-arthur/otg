const User = require('./schema');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const nJwt = require('njwt');

module.exports = async waw => {
	if (!waw.config.signingKey) {
		waw.config.signingKey = uuidv4();

		let serverJson = waw.readJson(process.cwd() + '/server.json');

		serverJson.signingKey = waw.config.signingKey;

		waw.writeJson(process.cwd() + '/server.json', serverJson);
	}

	if (waw.config.mail) {
		const nodemailer = require("nodemailer");

		let transporter = nodemailer.createTransport({
			secure: waw.config.mail.secure,
			service: 'Gmail',
			auth: {
				user: waw.config.mail.auth.user,
				pass: waw.config.mail.auth.pass
			}
		});

		waw.send = (opts, cb = resp => { }) => {
			console.log('send');
			transporter.sendMail({
				from: waw.config.mail.from,
				subject: opts.subject,
				to: opts.to,
				text: opts.text,
				html: opts.html
			}, (resp) => {
				console.log(resp);
			});
		}
	} else {
		waw.send = () => { }
	}

	if (mongoose.connection.readyState == 0) {
		mongoose.connect(waw.mongoUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});

		mongoose.Promise = global.Promise;
	}

	const router = waw.router('/api/user');

	router.post("/resetPassword", async (req, res) => {
		const user = await User.findOne({
			login: req.body.login
		});

		console.log(user);

		if (user) {
			user.resetPin = Math.floor(Math.random() * (999999 - 100000)) + 100000;

			user.markModified('resetPin');

			await user.save();

			waw.send({
				to: user.login,
				subject: 'Відновлення паролю',
				html: 'Для відновлення паролю введіть цей код: ' + user.resetPin
			});
		}

		res.status(200).json({ status: true, message: 'Code sent to email' });
	});

	router.post("/checkResetPin", async (req, res) => {
		const user = await User.findOne({
			login: req.body.login
		})

		if (user && user.resetPin === req.body.resetPin) {
			res.status(200).json({ status: true })
		} else {
			res.status(500).json({ status: false })
		}
	})

	router.post("/changePassword", async (req, res) => {
		const user = await User.findOne({
			login: req.body.login
		});

		if (user) {
			user.password = user.generateHash(req.body.password);

			delete user.resetPin;

			await user.save();

			res.status(200).json({ status: true });
		} else {
			res.status(500).json({ status: false });
		}
	});

	waw.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	const clearUser = user => {
		user = JSON.parse(JSON.stringify(user));

		delete user.password;

		delete user.resetPin;

		user.token = nJwt.create(user, waw.config.signingKey);

		user.token.setExpiration(new Date().getTime() + (365 * 24 * 60 * 60 * 1000));

		user.token = user.token.compact();

		return user;
	}

	router.post('/login', async (req, res) => {
		try {
			const user = await User.findOne({
				login: req.body.login
			});

			if (!user || !user.validPassword(req.body.password)) {
				return res.status(200).json({ status: false });
			}

			res.status(200).json({ status: true, data: clearUser(user) });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	});

	router.post('/sign', async (req, res) => {
		try {
			const userExists = await User.findOne({
				login: req.body.login
			});

			if (userExists) {
				return res.status(500).json({ status: false, message: 'User already exists' });
			}

			const user = new User({
				login: req.body.login.toLowerCase(),
				admin: waw.config.user.is.admin == req.body.login
			});

			user.password = user.generateHash(req.body.password);

			await user.save();

			res.status(200).json({ status: true, data: clearUser(user) });
		} catch (error) {
			res.status(500).json({ status: false, message: error.message });
		}
	});

	router.post('/update', async (req, res) => {
		try {
			const updatedUser = await User.updateOne({ _id: req.body._id }, req.body);

			if (updatedUser.n === 0) {
				return res.status(404).json({ status: false, message: 'Student not found' });
			}

			res.status(200).json({
				status: true,
				data: [updatedUser],
			});
		} catch (err) {
			res.status(500).json({ status: false, message: error.message, });
		}
	})
};
