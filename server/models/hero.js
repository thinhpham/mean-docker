var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Hero', new Schema({ 
    name: String,
    age: Number,
    createdBy: String,
    createdOn: Date,
    updatedBy: String,
    updatedOn: Date
}));