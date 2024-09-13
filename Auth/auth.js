const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const UserModel = require('../models/UserModel')

const cookieExtractor = req => {
	let token = null
	if (req && req.cookies) {
		token = req.cookies['JWT']
	}
	return token
}

const opts = {
	// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	secretOrKey: 'secret',
}

passport.use(
	new Strategy(opts, async (payload, done) => {
		try {
			const user = await UserModel.findById(payload.id)
			if (user) return done(null, user)
		} catch (error) {
			return done(error)
		}
	})
)
