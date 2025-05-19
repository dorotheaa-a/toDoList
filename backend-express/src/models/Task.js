const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    reminder: {
        enabled: { type: Boolean, default: false },
        triggerAt: { type: Date }
    },
    createdAt: { type: Date, default: Date.now },
});

taskSchema.index({ dueDate: 1, isCompleted: 1 });

module.exports = mongoose.model('Task', taskSchema);