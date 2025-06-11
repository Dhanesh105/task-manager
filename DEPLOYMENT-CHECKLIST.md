# 📋 Deployment Checklist

## Pre-Deployment Setup

### ✅ MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create new cluster (free tier)
- [ ] Create database user with read/write permissions
- [ ] Configure network access (allow 0.0.0.0/0 for Vercel)
- [ ] Get connection string
- [ ] Test connection locally

### ✅ Vercel Account Setup
- [ ] Create Vercel account
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`

### ✅ Code Preparation
- [ ] All code committed to Git repository
- [ ] Environment files configured (.env.example created)
- [ ] Dependencies installed and tested locally
- [ ] MongoDB migration completed (if needed)

## Backend Deployment

### ✅ Backend Files Ready
- [ ] `backend/vercel.json` exists
- [ ] `backend/package.json` has correct scripts
- [ ] `backend/.env.example` created
- [ ] CORS configuration updated for production
- [ ] MongoDB models and routes tested

### ✅ Deploy Backend
- [ ] Navigate to backend directory: `cd backend`
- [ ] Deploy: `vercel --prod`
- [ ] Note backend URL (e.g., `https://task-management-backend.vercel.app`)

### ✅ Backend Environment Variables
Set in Vercel Dashboard → Project → Settings → Environment Variables:
- [ ] `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management`
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL=https://your-frontend-app.vercel.app` (update after frontend deployment)

### ✅ Test Backend
- [ ] Visit: `https://your-backend-app.vercel.app/test-db`
- [ ] Should show: `{"success": true, "message": "MongoDB connection successful"}`
- [ ] Visit: `https://your-backend-app.vercel.app/tasks`
- [ ] Should return: `[]` (empty array) or existing tasks

## Frontend Deployment

### ✅ Frontend Files Ready
- [ ] `frontend/.env.local` exists with API URL
- [ ] `frontend/src/config/api.ts` created
- [ ] All components updated to use API config
- [ ] Dependencies installed and tested

### ✅ Deploy Frontend
- [ ] Navigate to frontend directory: `cd frontend`
- [ ] Deploy: `vercel --prod`
- [ ] Note frontend URL (e.g., `https://task-management-frontend.vercel.app`)

### ✅ Frontend Environment Variables
Set in Vercel Dashboard → Project → Settings → Environment Variables:
- [ ] `NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app`

### ✅ Update Backend CORS
- [ ] Update backend `FRONTEND_URL` environment variable with actual frontend URL
- [ ] Redeploy backend: `cd backend && vercel --prod`

## Post-Deployment Testing

### ✅ Functionality Tests
- [ ] Visit frontend URL
- [ ] Create a new task
- [ ] Mark task as complete/incomplete
- [ ] Edit a task
- [ ] Delete a task
- [ ] Test calendar view
- [ ] Test statistics page
- [ ] Test settings page
- [ ] Check browser console for errors

### ✅ API Tests
- [ ] Test all API endpoints manually or with Postman:
  - [ ] `GET /tasks` - List tasks
  - [ ] `POST /tasks` - Create task
  - [ ] `PUT /tasks/:id` - Update task
  - [ ] `DELETE /tasks/:id` - Delete task
  - [ ] `GET /settings` - Get settings
  - [ ] `PUT /settings` - Update settings

### ✅ Database Tests
- [ ] Verify tasks are saved to MongoDB Atlas
- [ ] Check MongoDB Atlas dashboard for data
- [ ] Test data persistence across browser sessions

## Production Monitoring

### ✅ Set Up Monitoring
- [ ] Monitor Vercel deployment logs
- [ ] Monitor MongoDB Atlas metrics
- [ ] Set up error tracking (optional)
- [ ] Configure uptime monitoring (optional)

### ✅ Performance Checks
- [ ] Test loading speeds
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS is working
- [ ] Test from different locations/devices

## Security Checklist

### ✅ Environment Security
- [ ] No sensitive data in Git repository
- [ ] Environment variables properly set in Vercel
- [ ] MongoDB Atlas network access configured
- [ ] CORS properly configured

### ✅ Application Security
- [ ] Input validation working
- [ ] Error messages don't expose sensitive info
- [ ] API endpoints properly secured
- [ ] Database queries use proper validation

## Documentation

### ✅ Update Documentation
- [ ] Update README with production URLs
- [ ] Document any deployment-specific configurations
- [ ] Create user guide (if needed)
- [ ] Document API endpoints (if needed)

## Final URLs

After successful deployment:

### Production URLs:
- **Frontend**: `https://your-frontend-app.vercel.app`
- **Backend**: `https://your-backend-app.vercel.app`
- **Database**: MongoDB Atlas cluster

### Test URLs:
- **API Health**: `https://your-backend-app.vercel.app/test-db`
- **Tasks API**: `https://your-backend-app.vercel.app/tasks`
- **Settings API**: `https://your-backend-app.vercel.app/settings`

## Troubleshooting Commands

```bash
# Check deployments
vercel ls

# View logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls

# Remove deployment (if needed)
vercel rm project-name
```

## Success Criteria

✅ **Deployment is successful when:**
- [ ] Frontend loads without errors
- [ ] Can create, read, update, delete tasks
- [ ] Settings can be modified and saved
- [ ] Data persists between sessions
- [ ] No console errors in browser
- [ ] API endpoints respond correctly
- [ ] MongoDB Atlas shows data

🎉 **Congratulations! Your MERN Task Management app is now live in production!**
