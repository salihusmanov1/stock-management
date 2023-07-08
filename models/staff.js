const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    status: {
        type: Schema.Types.ObjectId,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'position',
        required: true
    },
    birthDate: {
        type: Date,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Staff', staffSchema);
