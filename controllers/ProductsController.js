const productService = require('../services/ProductsService')

exports.getAllProducts = async (req, res) => {
	try {
		const products = await productService.getAllProducts()

		const totalProducts = await productService.countProducts()

		res.json({
			header: { 'X-Total-Count': totalProducts },
			data: products,
			status: 'success',
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.createNewProduct = async (req, res) => {
	try {
		const product = await productService.createNewProduct(req.body)
		res.json({ data: product, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.getProductById = async (req, res) => {
	try {
		const product = await productService.getProductById(req.params.id)
		res.json({ data: product, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.updateProduct = async (req, res) => {
	try {
		const product = await productService.updateProduct(req.params.id, req.body)
		res.json({ data: product, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

exports.deleteProduct = async (req, res) => {
	try {
		const product = await productService.deleteProduct(req.params.id)
		res.json({ data: product, status: 'success' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
