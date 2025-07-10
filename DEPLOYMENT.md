# 🚀 HRM Portal Deployment Guide

## Free Hosting Setup

This guide will help you deploy your HRM portal for free using Vercel (frontend) and Railway (backend).

### 📋 Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free)

### 🎯 Step 1: Deploy Backend to Railway

1. **Sign up for Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `hrmportal` repository
   - Set the root directory to `backend`
   - Railway will automatically detect it's a Node.js app

3. **Add Environment Variables**:
   - Go to your Railway project settings
   - Add these environment variables:
   ```
   DATABASE_URL=your_postgresql_url
   PORT=3001
   NODE_ENV=production
   ```

4. **Get your Railway URL**:
   - Railway will provide a URL like: `https://your-app-name.railway.app`
   - Copy this URL for the frontend configuration

### 🎯 Step 2: Deploy Frontend to Vercel

1. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**:
   - Click "New Project"
   - Import your `hrmportal` repository
   - Vercel will automatically detect it's a React app

3. **Add Environment Variables**:
   - Go to your Vercel project settings
   - Add these environment variables:
   ```
   REACT_APP_API_URL=https://your-railway-app.railway.app/api
   REACT_APP_SUPABASE_URL=https://uatucafpgcjljhjvkrzg.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdHVjYWZwZ2NqbGpoanZrcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTQ4MjcsImV4cCI6MjA2NzY3MDgyN30.MO6tJKNtBL6w2MYovPruF08rwMMcibQPFQFHK8pY44Y
   ```

### 🎯 Step 3: Database Setup

1. **Add PostgreSQL to Railway**:
   - In your Railway project, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will provide a connection URL

2. **Update Environment Variables**:
   - Copy the PostgreSQL URL
   - Update the `DATABASE_URL` in your Railway environment variables

3. **Run Database Migrations**:
   - Railway will automatically run `npm start` which includes the database setup

### 🎯 Step 4: Test Your Deployment

1. **Frontend URL**: `https://your-app-name.vercel.app`
2. **Backend URL**: `https://your-app-name.railway.app`

### 🔧 Troubleshooting

**Common Issues**:
- **CORS errors**: Make sure your Railway backend URL is correct in Vercel environment variables
- **Database connection**: Check that `DATABASE_URL` is set correctly in Railway
- **Build errors**: Ensure all dependencies are in `package.json`

**Environment Variables Checklist**:
- ✅ `REACT_APP_API_URL` (Vercel)
- ✅ `REACT_APP_SUPABASE_URL` (Vercel)
- ✅ `REACT_APP_SUPABASE_ANON_KEY` (Vercel)
- ✅ `DATABASE_URL` (Railway)
- ✅ `PORT` (Railway)
- ✅ `NODE_ENV` (Railway)

### 🎉 Success!

Your HRM portal will be live at your Vercel URL with:
- ✅ Beautiful login page
- ✅ Organization management
- ✅ Jobs & positions
- ✅ All HRM modules
- ✅ Supabase authentication
- ✅ PostgreSQL database

### 📊 Free Tier Limits

**Vercel**:
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains

**Railway**:
- $5 credit/month (enough for small apps)
- PostgreSQL database included
- Automatic deployments

### 🔄 Continuous Deployment

Both Vercel and Railway will automatically redeploy when you push changes to your GitHub repository! 