const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Import models
const Task = require('../models/Task');
const Settings = require('../models/Settings');

const migrateSQLiteToMongoDB = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Connect to SQLite
    const dbPath = path.resolve(__dirname, '../database.sqlite');
    const db = new sqlite3.Database(dbPath);
    console.log('✅ Connected to SQLite');

    // Migrate Tasks
    console.log('\n📋 Migrating Tasks...');
    const tasks = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    if (tasks.length > 0) {
      for (const task of tasks) {
        const mongoTask = new Task({
          title: task.title,
          description: task.description || '',
          due_date: task.due_date ? new Date(task.due_date) : null,
          completed: Boolean(task.completed),
          recurrence_rule: task.recurrence_rule
        });
        
        await mongoTask.save();
        console.log(`✓ Migrated task: ${task.title}`);
      }
      console.log(`📋 Successfully migrated ${tasks.length} tasks`);
    } else {
      console.log('📋 No tasks found to migrate');
    }

    // Migrate Settings
    console.log('\n⚙️ Migrating Settings...');
    const settings = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM settings', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    if (settings.length > 0) {
      for (const setting of settings) {
        const mongoSettings = new Settings({
          user_id: setting.user_id || 'default',
          theme: setting.theme || 'light',
          language: setting.language || 'en',
          notifications: Boolean(setting.notifications),
          default_view: setting.default_view || 'tasks',
          date_format: setting.date_format || 'MM/DD/YYYY',
          time_format: setting.time_format || '12h',
          start_day_of_week: setting.start_day_of_week || 0
        });
        
        await mongoSettings.save();
        console.log(`✓ Migrated settings for user: ${setting.user_id}`);
      }
      console.log(`⚙️ Successfully migrated ${settings.length} settings`);
    } else {
      console.log('⚙️ No settings found to migrate');
    }

    // Close connections
    db.close();
    await mongoose.connection.close();
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('You can now start your application with MongoDB');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this script is executed directly
if (require.main === module) {
  migrateSQLiteToMongoDB();
}

module.exports = migrateSQLiteToMongoDB;
