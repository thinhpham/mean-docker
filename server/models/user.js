var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({ 
    firstName: String,
    lastName: String,
    email: String,
    password: String, 
    isPasswordHashed: Boolean,
    isAdmin: Boolean,
    lastLogin: Date,
    createdBy: String,
    createdOn: Date,
    updatedBy: String,
    updatedOn: Date
}));