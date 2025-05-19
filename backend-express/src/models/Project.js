const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);