# Database URL Configuration Guide

## 📍 Where DATABASE_URL is Used

### 1. **Prisma Schema** (`backend/prisma/schema.prisma`)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ← This is where it's referenced
}
```

### 2. **Environment Variables**

#### **Local Development:**
Create `backend/.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/hrmportal"
PORT=3001
NODE_ENV=development
```

#### **Production (Render):**
Set in Render Web Service Environment Variables:
- Go to your Render service dashboard
- Click "Environment" tab
- Add: `DATABASE_URL` = `your_postgresql_connection_string`

### 3. **Database URL Formats**

#### **Local PostgreSQL:**
```
postgresql://username:password@localhost:5432/hrmportal
```

#### **Render PostgreSQL:**
```
postgresql://user:password@host:port/database_name
```

#### **Supabase PostgreSQL:**
```
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### 4. **How to Get Database URL**

#### **Option A: Render PostgreSQL (Recommended)**
1. Go to Render dashboard
2. Click "New" → "PostgreSQL"
3. Set name: `hrmportal-db`
4. Copy the connection string provided
5. Add to your backend service environment variables

#### **Option B: Supabase (Free)**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. Add to your backend service environment variables

### 5. **Testing Database Connection**

After setting DATABASE_URL, run:
```bash
cd backend
npm run db:push  # Push schema to database
npm start        # Start server
```

### 6. **Environment Variables Checklist**

**For Render Backend Service:**
- ✅ `DATABASE_URL` = Your PostgreSQL connection string
- ✅ `PORT` = 3001
- ✅ `NODE_ENV` = production

**For Vercel Frontend:**
- ✅ `REACT_APP_API_URL` = Your Render backend URL
- ✅ `REACT_APP_SUPABASE_URL` = Your Supabase URL
- ✅ `REACT_APP_SUPABASE_ANON_KEY` = Your Supabase key 