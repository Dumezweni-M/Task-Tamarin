const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    priority: {
        type: String, 
        enum: ['low', 'medium', 'high'], //Case must match
        required: true
    }
}, {timestamps: true});

// Name should be singular because mongoose pluralizes the name
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;