const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get settings (currently only supporting default user)
router.get('/', async (req, res) => {
  try {
    console.log('GET /settings route called');

    let settings = await Settings.findOne({ user_id: 'default' });

    if (!settings) {
      console.log('No settings found, creating default settings');
      // Create default settings if none exist
      settings = new Settings({
        user_id: 'default',
        theme: 'light',
        language: 'en',
        notifications: true,
        default_view: 'tasks',
        date_format: 'MM/DD/YYYY',
        time_format: '12h',
        start_day_of_week: 0
      });

      await settings.save();
      console.log('Default settings created');
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    const { theme, language, notifications, default_view, date_format, time_format, start_day_of_week } = req.body;

    console.log('Received settings update:', req.body);

    const updateData = {};
    if (theme !== undefined) updateData.theme = theme;
    if (language !== undefined) updateData.language = language;
    if (notifications !== undefined) updateData.notifications = notifications;
    if (default_view !== undefined) updateData.default_view = default_view;
    if (date_format !== undefined) updateData.date_format = date_format;
    if (time_format !== undefined) updateData.time_format = time_format;
    if (start_day_of_week !== undefined) updateData.start_day_of_week = start_day_of_week;

    let settings = await Settings.findOne({ user_id: 'default' });

    if (!settings) {
      // Create settings if they don't exist
      settings = new Settings({
        user_id: 'default',
        ...updateData
      });
      await settings.save();
    } else {
      // Update existing settings
      Object.assign(settings, updateData);
      await settings.save();
    }

    console.log('Updated settings in DB:', settings);
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;