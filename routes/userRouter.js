const express = require('express')
const passport = require('passport')

const {
	createNewUser,
	getUsersById,
	updateUser,
	deleteUser,
	loginUser,
	logoutUser,
	checkAuth,
	getAllUsers,
} = require('../controllers/UserController')

const router = express.Router()

const authenticate = passport.authenticate('jwt', { session: false })

router.route('/').get(authenticate, getAllUsers).post(createNewUser)
router.route('/login').post(loginUser)
router.route('/check-auth').get(authenticate, checkAuth)
router.route('/logout').post(authenticate, logoutUser)
router
	.route('/:id')
	.get(getUsersById)
	.put(authenticate, updateUser)
	.delete(deleteUser)

module.exports = router
