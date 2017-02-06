var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    isReceiveCommunication: Boolean,
    isReceivePartnersCommunication: Boolean,
    createdBy: String,
    createdOn: { type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);