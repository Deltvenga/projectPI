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
    },
    email: {
        type: String
    },
    emailConfirmed: {
        type: Boolean
    }
});
module.exports = mongoose.model('user', UserSchema);