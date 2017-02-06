var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    isPasswordHashed: Boolean,
    isConfirmed: Boolean,
    isAdmin: Boolean,
    lastLogin: Date,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);