# 🚀 Quick Deployment Guide

## Prerequisites
1. **Vercel Account**: [Sign up here](https://vercel.com)
2. **MongoDB Atlas**: [Create free cluster](https://mongodb.com/atlas)
3. **Git Repository**: Push your code to GitHub/GitLab

## Quick Deploy (Automated)

### Option 1: PowerShell Script (Windows)
```powershell
.\deploy.ps1
```

### Option 2: Bash Script (Linux/Mac)
```bash
./deploy.sh
```

### Option 3: Manual Deployment

#### Deploy Backend:
```bash
cd backend
npm install -g vercel  # if not installed
vercel login           # if not logged in
vercel --prod
```

#### Deploy Frontend:
```bash
cd frontend
vercel --prod
```

## Environment Variables

### Backend (Set in Vercel Dashboard):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Frontend (Set in Vercel Dashboard):
```
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

## MongoDB Atlas Setup

1. **Create Account**: Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. **Create Cluster**: Choose free tier
3. **Database Access**: Create user with read/write permissions
4. **Network Access**: Add IP `0.0.0.0/0` (allow all)
5. **Connect**: Get connection string

## Testing Deployment

1. **Backend Test**: Visit `https://your-backend-app.vercel.app/test-db`
2. **Frontend Test**: Visit `https://your-frontend-app.vercel.app`
3. **Full Test**: Create a task, mark as complete, check settings

## Troubleshooting

### Common Issues:
- **CORS Error**: Check `FRONTEND_URL` in backend env vars
- **Database Error**: Verify MongoDB connection string
- **API Error**: Check `NEXT_PUBLIC_API_URL` in frontend env vars

### Useful Commands:
```bash
vercel ls          # List deployments
vercel logs        # View logs
vercel --prod      # Deploy to production
```

## File Structure After Deployment

```
project/
├── backend/
│   ├── vercel.json          # Vercel config
│   ├── .env.example         # Environment template
│   └── ...
├── frontend/
│   ├── .env.local           # Local environment
│   ├── .env.example         # Environment template
│   └── ...
├── deploy.sh                # Bash deployment script
├── deploy.ps1               # PowerShell deployment script
├── DEPLOYMENT.md            # Detailed guide
└── README-DEPLOYMENT.md     # This quick guide
```

## Production URLs

After deployment:
- **Frontend**: `https://your-frontend-app.vercel.app`
- **Backend**: `https://your-backend-app.vercel.app`

## Support

For detailed instructions, see `DEPLOYMENT.md`

Happy deploying! 🎉
