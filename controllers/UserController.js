const userService = require('../services/UserService')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUsersById = async (req, res) => {
	try {
		const users = await userService.getUsersById(req.params.id)
		res.json({ data: users, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.updateUser = async (req, res) => {
	try {
		console.log(req.params.id)
		console.log(req.body)
		const users = await userService.updateUser(req.params.id, req.body)
		res.json({ data: users, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const users = await userService.deleteUser(req.params.id)
		res.json({ data: users, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.createNewUser = async (req, res) => {
	try {
		const users = await userService.createNewUser(req.body)
		res.json({ data: users, status: 'success' })
	} catch (error) {
		res.status(501).json({ error: error.message })
	}
}

exports.loginUser = async (req, res, next) => {
	try {
		const userExists = await userService.loginUser({ login: req.body.login })

		if (!userExists) {
			console.log('User does not exist')
			return res.status(400).json({ message: 'user does not exist' })
		}

		const isCorrectPass = await bcrypt.compare(req.body.pass, userExists.pass)
		if (!isCorrectPass) {
			console.log('Incorrect password')
			return res.status(401).json({ message: 'incorrect password' })
		}

		const accessToken = jwt.sign(
			{
				id: userExists._id,
			},
			'secret',
			{ expiresIn: '1d' }
		)

		// res.cookie('JWT', accessToken, {
		// 	httpOnly: true, // Protect from XSS attacks
		// 	// secure: true,      // Require HTTPS-conections only
		// 	sameSite: 'Strict', //Protect from CSRF attacks
		// 	maxAge: 86400000, // 1 day in MSec
		// })

		return res
			.status(200)
			.cookie('JWT', accessToken, {
				httpOnly: true, // Protect from XSS attacks
				// secure: true,      // Require HTTPS-connections only
				sameSite: 'Strict', //Protect from CSRF attacks
				maxAge: 86400000, // 1 day in MSec
			})
			.json({
				user: {
					_id: userExists._id,
					name: userExists.name,
					email: userExists.email,
					street: userExists.street,
					postcode: userExists.postcode,
					country: userExists.country,
					isAdmin: userExists.isAdmin,
					basket: userExists.basket,
				},

				message: 'user logged in',
				isAuth: true,
			})
	} catch (error) {
		console.error('Error during login:', error)
		next(error)
	}
}

exports.logoutUser = async (req, res) => {
	try {
		res.clearCookie('JWT', {
			httpOnly: true,
			// secure: true,  // HTTPS
			sameSite: 'Strict',
		})
		res.status(200).json({ status: 'success' })
	} catch (error) {
		res.status(501).json({ error: error.message })
	}
}

exports.checkAuth = async (req, res) => {
	try {
		console.log('tyt req', req)
		console.log('tyt req.user', req.user)
		res.status(200).json({
			authenticated: true,
			user: {
				_id: req.user._id,
				name: req.user.name,
				email: req.user.email,
				street: req.user.street,
				postcode: req.user.postcode,
				country: req.user.country,
				isAdmin: req.user.isAdmin,
				basket: req.user.basket,
			},
		})
	} catch (error) {
		res.status(501).json({ error: error.message })
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers()
		const filteredUsers = users.map(user => ({
			_id: user._id,
			name: user.name,
			email: user.email,
			street: user.street,
			postcode: user.postcode,
			country: user.country,
			isAdmin: user.isAdmin,
			basket: user.basket,
		}))

		res.json({
			status: 'success',
			data: filteredUsers,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
