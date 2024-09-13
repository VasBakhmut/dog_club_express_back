const express = require('express')

const {
	getAllProducts,
	createNewProduct,
	getProductById,
	updateProduct,
	deleteProduct,
} = require('../controllers/ProductsController')

const router = express.Router()

router.route('/').get(getAllProducts).post(createNewProduct)
router
	.route('/:id')
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct)

module.exports = router
