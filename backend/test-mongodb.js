const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Task = require('./models/Task');
const Settings = require('./models/Settings');

const testMongoDB = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create a sample task
    console.log('\n📋 Testing Task Creation...');
    const sampleTask = new Task({
      title: 'Test Task',
      description: 'This is a test task created to verify MongoDB integration',
      due_date: new Date('2024-12-31'),
      completed: false,
      recurrence_rule: null
    });

    const savedTask = await sampleTask.save();
    console.log('✓ Task created successfully:', savedTask.title);
    console.log('  ID:', savedTask._id);
    console.log('  Due Date:', savedTask.due_date);

    // Test 2: Fetch all tasks
    console.log('\n📋 Testing Task Retrieval...');
    const allTasks = await Task.find();
    console.log(`✓ Found ${allTasks.length} task(s) in database`);

    // Test 3: Create default settings
    console.log('\n⚙️ Testing Settings Creation...');
    let settings = await Settings.findOne({ user_id: 'default' });
    
    if (!settings) {
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
      console.log('✓ Default settings created successfully');
    } else {
      console.log('✓ Default settings already exist');
    }

    // Test 4: Update task
    console.log('\n📋 Testing Task Update...');
    const updatedTask = await Task.findByIdAndUpdate(
      savedTask._id,
      { completed: true },
      { new: true }
    );
    console.log('✓ Task updated successfully. Completed:', updatedTask.completed);

    // Test 5: Delete test task (cleanup)
    console.log('\n🧹 Cleaning up test data...');
    await Task.findByIdAndDelete(savedTask._id);
    console.log('✓ Test task deleted successfully');

    // Final verification
    console.log('\n🔍 Final Database State:');
    const finalTaskCount = await Task.countDocuments();
    const finalSettingsCount = await Settings.countDocuments();
    console.log(`  Tasks: ${finalTaskCount}`);
    console.log(`  Settings: ${finalSettingsCount}`);

    await mongoose.connection.close();
    console.log('\n🎉 All tests passed! MongoDB integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
};

// Run test
testMongoDB();
