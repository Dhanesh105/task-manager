#!/bin/bash

# MERN Task Management - Vercel Deployment Script
# This script helps deploy both frontend and backend to Vercel

set -e  # Exit on any error

echo "🚀 MERN Task Management - Vercel Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Installing..."
    npm install -g vercel
    print_success "Vercel CLI installed successfully"
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "You are not logged in to Vercel. Please log in:"
    vercel login
fi

print_status "Current Vercel user: $(vercel whoami)"

# Function to deploy backend
deploy_backend() {
    print_status "Deploying backend to Vercel..."
    cd backend
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in backend directory"
        exit 1
    fi
    
    # Deploy to Vercel
    print_status "Running vercel deployment for backend..."
    vercel --prod
    
    print_success "Backend deployed successfully!"
    print_warning "Don't forget to set these environment variables in Vercel dashboard:"
    echo "  - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task_management"
    echo "  - NODE_ENV=production"
    echo "  - FRONTEND_URL=https://your-frontend-app.vercel.app"
    
    cd ..
}

# Function to deploy frontend
deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    cd frontend
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        exit 1
    fi
    
    # Check if .env.local exists and has API URL
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local not found. Creating with default values..."
        echo "NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app" > .env.local
    fi
    
    # Deploy to Vercel
    print_status "Running vercel deployment for frontend..."
    vercel --prod
    
    print_success "Frontend deployed successfully!"
    print_warning "Don't forget to set this environment variable in Vercel dashboard:"
    echo "  - NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app"
    
    cd ..
}

# Function to show post-deployment instructions
show_instructions() {
    echo ""
    print_success "🎉 Deployment completed!"
    echo ""
    print_status "Next steps:"
    echo "1. Set up MongoDB Atlas (if not already done):"
    echo "   - Create account at https://mongodb.com/atlas"
    echo "   - Create cluster and database user"
    echo "   - Get connection string"
    echo ""
    echo "2. Set environment variables in Vercel dashboard:"
    echo "   Backend:"
    echo "   - MONGODB_URI=your_mongodb_connection_string"
    echo "   - NODE_ENV=production"
    echo "   - FRONTEND_URL=your_frontend_vercel_url"
    echo ""
    echo "   Frontend:"
    echo "   - NEXT_PUBLIC_API_URL=your_backend_vercel_url"
    echo ""
    echo "3. Test your deployment:"
    echo "   - Visit your frontend URL"
    echo "   - Test creating and managing tasks"
    echo "   - Check browser console for any errors"
    echo ""
    print_status "For detailed instructions, see DEPLOYMENT.md"
}

# Main deployment flow
main() {
    echo ""
    print_status "What would you like to deploy?"
    echo "1) Backend only"
    echo "2) Frontend only"
    echo "3) Both (recommended)"
    echo "4) Exit"
    echo ""
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            deploy_backend
            ;;
        2)
            deploy_frontend
            ;;
        3)
            deploy_backend
            echo ""
            deploy_frontend
            ;;
        4)
            print_status "Deployment cancelled"
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please run the script again."
            exit 1
            ;;
    esac
    
    show_instructions
}

# Run main function
main
