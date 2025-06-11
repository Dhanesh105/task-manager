const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  process.env.FRONTEND_URL,
  // Add your Vercel frontend URL here after deployment
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Import models to ensure they are registered
require('./models/Task');
require('./models/Settings');

// Routes
// Add this before your routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Then your existing routes
app.use('/tasks', require('./routes/tasks'));
app.use('/settings', require('./routes/settings')); // Add this line

// Add this after your routes to catch 404 errors
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send('Not Found');
});

// Default route
app.get('/', (req, res) => {
  res.send('Task Management API');
});

// Test database connection endpoint
app.get('/test-db', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    if (connectionState === 1) {
      res.json({
        success: true,
        message: 'MongoDB connection successful',
        state: states[connectionState],
        database: mongoose.connection.name,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'MongoDB connection failed',
        state: states[connectionState],
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// New route to display tasks in HTML table format
app.get('/table-view', async (req, res) => {
  try {
    const Task = require('./models/Task');
    const tasks = await Task.find().sort({ due_date: 1 });
    const rows = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      completed: task.completed,
      recurrence_rule: task.recurrence_rule
    }));

    // Generate HTML table
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tasks Database</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
          }
          h1 {
            color: #6366f1;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          th {
            background-color: #6366f1;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9fafb;
          }
          tr:hover {
            background-color: #f0f1fe;
          }
          .completed {
            background-color: #dcfce7;
          }
          .completed td:first-child {
            text-decoration: line-through;
          }
          .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          .badge-completed {
            background-color: #22c55e;
            color: white;
          }
          .badge-pending {
            background-color: #6366f1;
            color: white;
          }
          .timestamp {
            font-size: 12px;
            color: #6c757d;
            margin-bottom: 20px;
          }
          .description {
            max-width: 300px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        </style>
      </head>
      <body>
        <h1>Tasks Database</h1>
        <p class="timestamp">Generated on: ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Recurrence</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    if (rows.length === 0) {
      html += `
        <tr>
          <td colspan="6" style="text-align: center;">No tasks found</td>
        </tr>
      `;
    } else {
      rows.forEach(task => {
        // Parse recurrence rule if exists
        let recurrenceText = 'None';
        if (task.recurrence_rule) {
          try {
            const rule = JSON.parse(task.recurrence_rule);
            recurrenceText = `${rule.frequency} (every ${rule.interval} ${rule.interval === 1 ? rule.frequency.slice(0, -2) : rule.frequency})`;
          } catch (e) {
            recurrenceText = 'Invalid format';
          }
        }
        
        // Format due date
        const dueDate = task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set';
        
        html += `
          <tr class="${task.completed ? 'completed' : ''}">
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td class="description">${task.description || 'No description'}</td>
            <td>${dueDate}</td>
            <td>
              <span class="badge ${task.completed ? 'badge-completed' : 'badge-pending'}">
                ${task.completed ? 'Completed' : 'Pending'}
              </span>
            </td>
            <td>${recurrenceText}</td>
          </tr>
        `;
      });
    }
    
    html += `
          </tbody>
        </table>
        <p>Total tasks: ${rows.length}</p>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});