const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    default: 'default',
    unique: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  language: {
    type: String,
    default: 'en'
  },
  notifications: {
    type: Boolean,
    default: true
  },
  default_view: {
    type: String,
    enum: ['tasks', 'calendar', 'list'],
    default: 'tasks'
  },
  date_format: {
    type: String,
    enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
    default: 'MM/DD/YYYY'
  },
  time_format: {
    type: String,
    enum: ['12h', '24h'],
    default: '12h'
  },
  start_day_of_week: {
    type: Number,
    min: 0,
    max: 6,
    default: 0 // 0 = Sunday, 1 = Monday, etc.
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Index is already created by unique: true on user_id field

module.exports = mongoose.model('Settings', settingsSchema);
