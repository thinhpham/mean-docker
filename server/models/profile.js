var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Profile', new Schema({
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    createdBy: String,
    createdOn: Date,
    updatedBy: String,
    updatedOn: Date
}));