const ProductModel = require('../models/ProductModel')

exports.getAllProducts = () => {
	return ProductModel.find()
}

exports.countProducts = () => {
	return ProductModel.countDocuments()
}

exports.createNewProduct = product => {
	return ProductModel.create(product)
}

exports.getProductById = id => {
	return ProductModel.findById(id)
}

exports.updateProduct = (id, product) => {
	return ProductModel.findByIdAndUpdate(id, product)
}

exports.deleteProduct = id => {
	return ProductModel.findByIdAndDelete(id)
}
