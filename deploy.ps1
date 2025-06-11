# MERN Task Management - Vercel Deployment Script (PowerShell)
# This script helps deploy both frontend and backend to Vercel

param(
    [string]$Target = ""
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 MERN Task Management - Vercel Deployment Script" -ForegroundColor Blue
Write-Host "==================================================" -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version 2>$null
    Write-Status "Vercel CLI is installed: $vercelVersion"
} catch {
    Write-Error "Vercel CLI is not installed. Installing..."
    npm install -g vercel
    Write-Success "Vercel CLI installed successfully"
}

# Check if user is logged in to Vercel
try {
    $vercelUser = vercel whoami 2>$null
    Write-Status "Current Vercel user: $vercelUser"
} catch {
    Write-Warning "You are not logged in to Vercel. Please log in:"
    vercel login
}

# Function to deploy backend
function Deploy-Backend {
    Write-Status "Deploying backend to Vercel..."
    
    if (-not (Test-Path "backend/package.json")) {
        Write-Error "package.json not found in backend directory"
        exit 1
    }
    
    Set-Location backend
    
    try {
        Write-Status "Running vercel deployment for backend..."
        vercel --prod
        
        Write-Success "Backend deployed successfully!"
        Write-Warning "Don't forget to set these environment variables in Vercel dashboard:"
        Write-Host "  - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management" -ForegroundColor White
        Write-Host "  - NODE_ENV=production" -ForegroundColor White
        Write-Host "  - FRONTEND_URL=https://your-frontend-app.vercel.app" -ForegroundColor White
    } catch {
        Write-Error "Backend deployment failed: $_"
        exit 1
    } finally {
        Set-Location ..
    }
}

# Function to deploy frontend
function Deploy-Frontend {
    Write-Status "Deploying frontend to Vercel..."
    
    if (-not (Test-Path "frontend/package.json")) {
        Write-Error "package.json not found in frontend directory"
        exit 1
    }
    
    Set-Location frontend
    
    # Check if .env.local exists and has API URL
    if (-not (Test-Path ".env.local")) {
        Write-Warning ".env.local not found. Creating with default values..."
        "NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app" | Out-File -FilePath ".env.local" -Encoding UTF8
    }
    
    try {
        Write-Status "Running vercel deployment for frontend..."
        vercel --prod
        
        Write-Success "Frontend deployed successfully!"
        Write-Warning "Don't forget to set this environment variable in Vercel dashboard:"
        Write-Host "  - NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app" -ForegroundColor White
    } catch {
        Write-Error "Frontend deployment failed: $_"
        exit 1
    } finally {
        Set-Location ..
    }
}

# Function to show post-deployment instructions
function Show-Instructions {
    Write-Host ""
    Write-Success "🎉 Deployment completed!"
    Write-Host ""
    Write-Status "Next steps:"
    Write-Host "1. Set up MongoDB Atlas (if not already done):" -ForegroundColor White
    Write-Host "   - Create account at https://mongodb.com/atlas" -ForegroundColor Gray
    Write-Host "   - Create cluster and database user" -ForegroundColor Gray
    Write-Host "   - Get connection string" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Set environment variables in Vercel dashboard:" -ForegroundColor White
    Write-Host "   Backend:" -ForegroundColor Gray
    Write-Host "   - MONGODB_URI=your_mongodb_connection_string" -ForegroundColor Gray
    Write-Host "   - NODE_ENV=production" -ForegroundColor Gray
    Write-Host "   - FRONTEND_URL=your_frontend_vercel_url" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   Frontend:" -ForegroundColor Gray
    Write-Host "   - NEXT_PUBLIC_API_URL=your_backend_vercel_url" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Test your deployment:" -ForegroundColor White
    Write-Host "   - Visit your frontend URL" -ForegroundColor Gray
    Write-Host "   - Test creating and managing tasks" -ForegroundColor Gray
    Write-Host "   - Check browser console for any errors" -ForegroundColor Gray
    Write-Host ""
    Write-Status "For detailed instructions, see DEPLOYMENT.md"
}

# Main deployment flow
function Main {
    if ($Target -eq "") {
        Write-Host ""
        Write-Status "What would you like to deploy?"
        Write-Host "1) Backend only" -ForegroundColor White
        Write-Host "2) Frontend only" -ForegroundColor White
        Write-Host "3) Both (recommended)" -ForegroundColor White
        Write-Host "4) Exit" -ForegroundColor White
        Write-Host ""
        $choice = Read-Host "Enter your choice (1-4)"
    } else {
        $choice = $Target
    }
    
    switch ($choice) {
        "1" {
            Deploy-Backend
        }
        "2" {
            Deploy-Frontend
        }
        "3" {
            Deploy-Backend
            Write-Host ""
            Deploy-Frontend
        }
        "4" {
            Write-Status "Deployment cancelled"
            exit 0
        }
        default {
            Write-Error "Invalid choice. Please run the script again."
            exit 1
        }
    }
    
    Show-Instructions
}

# Run main function
Main
