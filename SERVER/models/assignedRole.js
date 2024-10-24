const mongoose = require('mongoose');

const assignedRole = mongoose.Schema({
    assignedBy: Number,
    user: String, // the 6 digits
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
})

module.exports = mongoose.model('AssignedRole', assignedRole);