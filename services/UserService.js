const UserModel = require('../models/UserModel')

exports.getAllUsers = () => {
	return UserModel.find()
}

exports.createNewUser = user => {
	return UserModel.create(user)
}

exports.getUsersById = id => {
	return UserModel.findById(id)
}

exports.updateUser = (id, user) => {
	return UserModel.findByIdAndUpdate(id, user)
}

exports.deleteUser = id => {
	return UserModel.findByIdAndDelete(id)
}

exports.loginUser = user => {
	console.log(user)
	return UserModel.findOne(user)
}
