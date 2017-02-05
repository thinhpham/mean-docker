var mongoose = require('mongoose');

var heroSchema = new mongoose.Schema({ 
    name: { type: String, required: true, unique: true },
    age: Number,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hero', heroSchema);