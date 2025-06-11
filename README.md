# 📋 MERN Task Management Application

A full-stack task management application built with MongoDB, Express.js, React (Next.js), and Node.js. Features include task creation, due dates, recurrence rules, calendar view, statistics, and user settings.

![Task Management](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Live Demo

- **Frontend**: [Coming Soon - Deploy to get URL]
- **Backend API**: [Coming Soon - Deploy to get URL]

## ✨ Features

### 📝 Task Management
- ✅ Create, read, update, and delete tasks
- 📅 Set due dates with date picker
- 🔄 Configure recurring tasks (daily, weekly, monthly, yearly)
- ✔️ Mark tasks as complete/incomplete
- 📝 Add detailed descriptions

### 📊 Views & Analytics
- 📋 **Task List View**: Clean, organized task display
- 📅 **Calendar View**: Visual calendar with task indicators
- 📈 **Statistics Dashboard**: Completion rates and analytics
- ⚙️ **Settings Page**: Customize preferences

### 🎨 User Experience
- 🌙 Theme support (Light/Dark/System)
- 🌍 Multi-language support
- 📱 Responsive design for all devices
- 🔔 Notification preferences
- 📊 Real-time statistics

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management
- **date-fns** - Date utilities
- **CSS Modules** - Styling

### Deployment
- **Vercel** - Hosting platform
- **MongoDB Atlas** - Cloud database

## 📁 Project Structure

```
task-manager/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   └── vercel.json         # Vercel deployment config
├── frontend/               # Next.js React app
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── config/        # API configuration
│   │   └── store/         # State management
│   └── public/            # Static assets
├── deploy.ps1             # PowerShell deployment script
├── deploy.sh              # Bash deployment script
└── DEPLOYMENT.md          # Deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed

### 1. Clone Repository
```bash
git clone https://github.com/Dhanesh105/task-manager.git
cd task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Test**: http://localhost:5000/test-db

## 🌐 Deployment

### Quick Deploy to Vercel

#### Option 1: Automated Script
```powershell
# Windows
.\deploy.ps1

# Linux/Mac
./deploy.sh
```

#### Option 2: Manual Deployment
```bash
# Deploy Backend
cd backend
vercel --prod

# Deploy Frontend
cd frontend
vercel --prod
```

### Environment Variables

#### Backend (Vercel Dashboard)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
```

#### Frontend (Vercel Dashboard)
```env
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 📚 API Documentation

### Tasks Endpoints
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `GET /tasks/:id` - Get specific task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Settings Endpoints
- `GET /settings` - Get user settings
- `PUT /settings` - Update settings

### Utility Endpoints
- `GET /test-db` - Test database connection
- `GET /table-view` - HTML table view of tasks

## 🧪 Testing

### Backend Tests
```bash
cd backend
node test-mongodb.js      # Test MongoDB connection
node quick-test.js        # Quick functionality test
```

### Manual Testing
1. Create a task with due date
2. Mark task as complete
3. Test recurrence settings
4. Verify calendar view
5. Check statistics page

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhanesh**
- GitHub: [@Dhanesh105](https://github.com/Dhanesh105)
- Repository: [task-manager](https://github.com/Dhanesh105/task-manager)

## 🙏 Acknowledgments

- MongoDB for excellent database documentation
- Vercel for seamless deployment platform
- Next.js team for the amazing React framework
- Open source community for inspiration

## 📞 Support

If you have any questions or need help with deployment, please:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
2. Review the [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)
3. Open an issue on GitHub

---

⭐ **Star this repository if you found it helpful!**
