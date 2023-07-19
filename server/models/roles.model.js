const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

module.exports = mongoose.model('Roles', rolesSchema);