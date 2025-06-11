// Quick test script to verify MongoDB setup
const mongoose = require('mongoose');
require('dotenv').config();

const Task = require('./models/Task');

const quickTest = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management');
    console.log('✅ MongoDB Connected');

    // Create a test task
    const testTask = new Task({
      title: 'MongoDB Test Task',
      description: 'Testing MongoDB integration',
      due_date: new Date(),
      completed: false
    });

    const savedTask = await testTask.save();
    console.log('✅ Task Created:', savedTask.title);

    // Fetch all tasks
    const allTasks = await Task.find();
    console.log(`✅ Found ${allTasks.length} tasks in database`);

    // Clean up test task
    await Task.findByIdAndDelete(savedTask._id);
    console.log('✅ Test task cleaned up');

    await mongoose.connection.close();
    console.log('🎉 All tests passed! MongoDB is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

quickTest();
