const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	pass: {
		type: String,
		required: true,
	},
	street: {
		type: String,
		required: true,
	},
	postcode: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	basket: [],
	isAdmin: {
		type: Boolean,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

userSchema.pre('save', async function (next) {
	const user = this
	if (!user.isModified('pass')) return next()
	user.pass = await bcrypt.hash(user.pass, 8)
	next()
})

userSchema.methods.isValidPassword = async function (pass) {
	const user = this
	return await bcrypt.compare(pass, user.password)
}

module.exports = mongoose.model('User', userSchema)
