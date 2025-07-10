#!/bin/bash

echo "🚀 HRM Portal Deployment Script"
echo "================================"

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first."
    git status
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "🎯 Next Steps:"
echo "1. Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "3. Update CORS in backend/index.ts with your actual Vercel URL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 