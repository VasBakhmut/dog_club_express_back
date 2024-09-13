const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	qty: {
		type: String,
	},
	vendorCode: {
		type: String,
	},
	price: {
		type: Number,
	},
	specialPrice: {
		type: Number,
	},
	rate: {
		type: Number,
	},
	image: {
		type: String,
	},
	imageSrc: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Products', productSchema)
