const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  due_date: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  recurrence_rule: {
    type: String,
    default: null
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Index for better query performance
taskSchema.index({ due_date: 1 });
taskSchema.index({ completed: 1 });

module.exports = mongoose.model('Task', taskSchema);
