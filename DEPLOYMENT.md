# 🚀 HRM Portal Deployment Guide

## Free Hosting Setup (No Time Limits!)

This guide will help you deploy your HRM portal for free using **Vercel** (frontend) and **Render** (backend) - both have generous free tiers with no time limits!

### 📋 Prerequisites
- GitHub account
- Vercel account (free forever)
- Render account (free forever)

### 🎯 Step 1: Deploy Backend to Render

1. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**:
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Set the following:
     - **Name**: `hrmportal-backend`
     - **Root Directory**: `backend`
     - **Runtime**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Add Environment Variables**:
   - Go to your Render service settings
   - Add these environment variables:
   ```
   DATABASE_URL=your_postgresql_url
   PORT=3001
   NODE_ENV=production
   ```

4. **Get your Render URL**:
   - Render will provide a URL like: `https://hrmportal-backend.onrender.com`
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
   REACT_APP_API_URL=https://hrmportal-backend.onrender.com/api
   REACT_APP_SUPABASE_URL=https://uatucafpgcjljhjvkrzg.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdHVjYWZwZ2NqbGpoanZrcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwOTQ4MjcsImV4cCI6MjA2NzY3MDgyN30.MO6tJKNtBL6w2MYovPruF08rwMMcibQPFQFHK8pY44Y
   ```

### 🎯 Step 3: Database Setup

1. **Add PostgreSQL to Render**:
   - In your Render dashboard, click "New"
   - Select "PostgreSQL"
   - Set name: `hrmportal-db`
   - Plan: Free

2. **Update Environment Variables**:
   - Copy the PostgreSQL connection string from Render
   - Update the `DATABASE_URL` in your backend service environment variables

3. **Run Database Migrations**:
   - Render will automatically run your start command which includes database setup

### 🎯 Step 4: Test Your Deployment

1. **Frontend URL**: `https://your-app-name.vercel.app`
2. **Backend URL**: `https://hrmportal-backend.onrender.com`

### 🔧 Troubleshooting

**Common Issues**:
- **CORS errors**: Make sure your Render backend URL is correct in Vercel environment variables
- **Database connection**: Check that `DATABASE_URL` is set correctly in Render
- **Build errors**: Ensure all dependencies are in `package.json`

**Environment Variables Checklist**:
- ✅ `REACT_APP_API_URL` (Vercel)
- ✅ `REACT_APP_SUPABASE_URL` (Vercel)
- ✅ `REACT_APP_SUPABASE_ANON_KEY` (Vercel)
- ✅ `DATABASE_URL` (Render)
- ✅ `PORT` (Render)
- ✅ `NODE_ENV` (Render)

### 🎉 Success!

Your HRM portal will be live at your Vercel URL with:
- ✅ Beautiful login page
- ✅ Organization management
- ✅ Jobs & positions
- ✅ All HRM modules
- ✅ Supabase authentication
- ✅ PostgreSQL database

### 📊 Free Tier Limits (No Time Limits!)

**Vercel**:
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains
- **Free forever!**

**Render**:
- 750 hours/month for web services
- 1GB RAM, 0.1 CPU
- PostgreSQL database (90 days free, then $7/month)
- **Web services free forever!**

### 🔄 Continuous Deployment

Both Vercel and Render will automatically redeploy when you push changes to your GitHub repository!

### 💡 Alternative: Completely Free Database

If you want a completely free database, consider:
- **Supabase** (PostgreSQL, free tier)
- **PlanetScale** (MySQL, free tier)
- **Neon** (PostgreSQL, free tier)

Just update the `DATABASE_URL` in your Render environment variables! 