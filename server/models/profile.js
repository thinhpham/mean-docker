var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);