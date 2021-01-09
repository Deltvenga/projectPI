const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    icon: {
        type: String
    },
    marks: {
        type: Array
    }
});
module.exports = mongoose.model('user', UserSchema);