# 🚀 Vercel Deployment Guide

This guide will help you deploy your MERN Task Management application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud MongoDB database at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Phase 1: Set Up MongoDB Atlas (Cloud Database)

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://mongodb.com/atlas)
- Sign up for a free account
- Create a new cluster (free tier is sufficient)

### 2. Configure Database Access
- Go to "Database Access" in your Atlas dashboard
- Create a new database user with read/write permissions
- Note down the username and password

### 3. Configure Network Access
- Go to "Network Access" in your Atlas dashboard
- Add IP address `0.0.0.0/0` (allow access from anywhere) for Vercel deployment
- Or add specific Vercel IP ranges if you prefer more security

### 4. Get Connection String
- Go to "Clusters" and click "Connect"
- Choose "Connect your application"
- Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## Phase 2: Deploy Backend to Vercel

### 1. Prepare Backend for Deployment
The backend is already configured with:
- `vercel.json` configuration file
- Environment variable support
- CORS configuration for production

### 2. Deploy Backend
```bash
# Navigate to backend directory
cd backend

# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: task-management-backend (or your preferred name)
# - Directory: ./
# - Override settings? No
```

### 3. Set Environment Variables for Backend
After deployment, set these environment variables in Vercel dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
```

To set environment variables:
1. Go to your Vercel dashboard
2. Select your backend project
3. Go to Settings → Environment Variables
4. Add each variable

### 4. Get Backend URL
After deployment, note your backend URL (e.g., `https://task-management-backend.vercel.app`)

## Phase 3: Deploy Frontend to Vercel

### 1. Update Frontend Configuration
Update `frontend/.env.local` with your backend URL:
```
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

### 2. Deploy Frontend
```bash
# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: task-management-frontend (or your preferred name)
# - Directory: ./
# - Override settings? No
```

### 3. Set Environment Variables for Frontend
Set this environment variable in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

## Phase 4: Update CORS Configuration

### 1. Update Backend CORS
After frontend deployment, update your backend's environment variables:
```
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### 2. Redeploy Backend
```bash
cd backend
vercel --prod
```

## Phase 5: Test Deployment

### 1. Test Backend
Visit your backend URL and test these endpoints:
- `https://your-backend-app.vercel.app/test-db` - Should show database connection status
- `https://your-backend-app.vercel.app/tasks` - Should return empty array or existing tasks

### 2. Test Frontend
Visit your frontend URL and test:
- Creating a new task
- Viewing tasks
- Updating task completion
- Settings page

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend environment variables
   - Check that both URLs are using HTTPS

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check that network access allows connections from anywhere (0.0.0.0/0)
   - Ensure database user has correct permissions

3. **API Not Found Errors**
   - Verify `NEXT_PUBLIC_API_URL` is set correctly in frontend
   - Check that backend is deployed and accessible

4. **Environment Variables Not Working**
   - Environment variables in Vercel need to be set through the dashboard
   - Redeploy after setting environment variables

### Useful Commands:

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy with production flag
vercel --prod

# Remove deployment
vercel rm project-name
```

## Production URLs

After successful deployment, you'll have:
- **Frontend**: `https://your-frontend-app.vercel.app`
- **Backend**: `https://your-backend-app.vercel.app`
- **Database**: MongoDB Atlas cluster

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to Git
2. **Database Access**: Consider restricting IP access in production
3. **CORS**: Update CORS configuration to only allow your frontend domain
4. **API Keys**: Use environment variables for all sensitive data

## Maintenance

- **Logs**: Check Vercel dashboard for deployment and runtime logs
- **Monitoring**: Set up monitoring for your MongoDB Atlas cluster
- **Updates**: Redeploy when you make changes to your code

Your MERN Task Management application is now deployed and ready for production use! 🎉
