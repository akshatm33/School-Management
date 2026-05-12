# 🚀 School Management API - Deployment Guide

This guide will help you deploy the School Management API to production platforms.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- A MySQL database (managed services like AWS RDS, PlanetScale, or local)
- A Git repository with your code
- An account on your chosen platform (Render, Railway, etc.)
- Node.js 14+ installed locally for testing

---

## 🌐 Production Environment Variables

Create a `.env` file with production values:

```env
PORT=5000
NODE_ENV=production
DB_HOST=your-database-host.com
DB_USER=your_db_username
DB_PASSWORD=your_secure_password
DB_NAME=school_management
DB_PORT=3306
CORS_ORIGIN=https://your-frontend-domain.com
API_VERSION=v1
```

**Security Notes:**
- ✅ Always use strong passwords for database credentials
- ✅ Store sensitive data in platform environment variables (not in code)
- ✅ Use HTTPS only in production
- ✅ Set NODE_ENV=production for optimal performance

---

## 🔧 Local Testing Before Deployment

Test your app locally with production settings:

```bash
# Install dependencies
npm install

# Set production environment
set NODE_ENV=production

# Start server
npm start
```

Visit `http://localhost:5000` to verify it's working.

---

## 🚀 Deployment on Render

Render is a modern cloud platform with free tier and automatic deployments from GitHub.

### Step 1: Prepare Your Code
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Create Render Service
1. Go to [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in the settings:
   - **Name:** `school-management-api` (or your choice)
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your main branch)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 3: Add Environment Variables
1. Click **Environment** tab
2. Add these variables:
   ```
   NODE_ENV = production
   DB_HOST = your-database-host
   DB_USER = your_username
   DB_PASSWORD = your_secure_password
   DB_NAME = school_management
   DB_PORT = 3306
   CORS_ORIGIN = https://your-frontend-domain.com
   API_VERSION = v1
   ```

### Step 4: Deploy
- Click **Create Web Service**
- Render will automatically deploy when you push to GitHub
- Your API will be available at: `https://school-management-api.onrender.com`

### Step 5: Verify Deployment
```bash
curl https://school-management-api.onrender.com/
```

You should see the welcome message! ✅

---

## 🚂 Deployment on Railway

Railway offers a simple deployment experience with automatic Git integration.

### Step 1: Prepare Your Code
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Click **New Project**
3. Click **Deploy from GitHub**
4. Select your repository
5. Allow Railway to access your GitHub

### Step 3: Add MySQL Database
1. In your Railway dashboard, click **+ New**
2. Select **MySQL**
3. Railway will auto-configure the database

### Step 4: Configure Environment Variables
1. Select your web service
2. Go to **Variables** tab
3. Add all variables from `.env.example`:
   ```
   NODE_ENV=production
   DB_HOST=${{mysql.MYSQL_HOST}}
   DB_USER=${{mysql.MYSQL_USER}}
   DB_PASSWORD=${{mysql.MYSQL_PASSWORD}}
   DB_NAME=${{mysql.MYSQL_DB_NAME}}
   DB_PORT=${{mysql.MYSQL_PORT}}
   CORS_ORIGIN=https://your-frontend-domain.com
   API_VERSION=v1
   ```

### Step 5: Set Start Command
1. Go to **Deploy** tab
2. Set **Start Command:** `npm start`

### Step 6: Deploy
- Railway automatically deploys when you push to GitHub
- Your API URL will be shown in the Railway dashboard
- Example: `https://school-management-api-production.up.railway.app`

### Step 7: Verify Deployment
```bash
curl https://school-management-api-production.up.railway.app/
```

---

## 💾 Database Migration for Production

### Setup MySQL Database (if not using managed service)

1. **Create database on your server:**
```sql
CREATE DATABASE school_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_management;

-- Create schools table
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT(10, 8) NOT NULL,
  longitude FLOAT(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create students table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  school_id INT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  grade VARCHAR(50),
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (school_id) REFERENCES schools(id),
  INDEX (email),
  INDEX (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

2. **Or import the schema file:**
   - Use your platform's database GUI to import `schema.sql`

---

## 🔒 Security Best Practices

### Implemented in the API:

✅ **Security Headers**
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection

✅ **Input Validation**
- Request size limited to 10KB
- All inputs validated before database operations
- SQL injection prevention via parameterized queries

✅ **CORS Protection**
- Configurable CORS_ORIGIN for production
- Credentials enabled safely

✅ **Error Handling**
- Graceful error responses
- No sensitive data in error messages
- Stack traces hidden in production

### Additional Steps:

1. **Use HTTPS Only**
   - All cloud platforms provide free SSL certificates
   - Redirect HTTP to HTTPS

2. **Database Security**
   - Use strong passwords (16+ characters)
   - Use managed database services for automatic backups
   - Enable encryption at rest
   - Use private networks when available

3. **Rate Limiting** (Optional)
   - Consider adding rate limiting for production
   ```bash
   npm install express-rate-limit
   ```

4. **Monitoring & Logging**
   - Set up error tracking (e.g., Sentry)
   - Monitor uptime (e.g., UptimeRobot)
   - Review server logs regularly

---

## 🧪 Testing Your Deployment

### Health Check Endpoint
```bash
curl https://your-api-url/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "statusCode": 200,
  "timestamp": "2024-05-12T10:30:00.000Z"
}
```

### Create a School
```bash
curl -X POST https://your-api-url/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "123 Main St",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
```

### Fetch All Schools
```bash
curl https://your-api-url/api/schools
```

---

## 🔄 Continuous Deployment

Both Render and Railway automatically redeploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Automatic deployment starts! ✅
```

Check deployment status in your platform's dashboard.

---

## 📊 Monitor Your Deployment

### Render Monitoring
- View logs: Dashboard → Web Service → Logs
- Set up email alerts for downtime
- Monitor resource usage

### Railway Monitoring
- View logs: Dashboard → Logs tab
- Set up monitors for uptime
- Check resource consumption

---

## 🆘 Troubleshooting

### API returns 503 Service Unavailable
**Problem:** Database connection failed
- Check DB_HOST, DB_USER, DB_PASSWORD are correct
- Verify database is running and accessible
- Check firewall rules allow connections

### API returns 500 Internal Server Error
**Problem:** Check server logs
- Click **Logs** in your platform dashboard
- Look for error messages
- Verify environment variables are set

### Deployment fails
**Problem:** Build errors
- Check `npm start` works locally
- Verify package.json has `"start": "node server.js"`
- Ensure Node.js version is compatible (14+)

### CORS errors from frontend
**Problem:** Frontend can't reach API
- Set CORS_ORIGIN environment variable to your frontend URL
- Example: `CORS_ORIGIN=https://myapp.com`
- Restart the application

---

## 📈 Scaling Your API

When your app grows:

1. **Database Optimization**
   - Add indexes for frequently queried fields
   - Consider read replicas for high traffic

2. **Caching**
   - Add Redis for caching frequently accessed data
   - Cache school and student lists

3. **Load Balancing**
   - Scale to multiple instances
   - Both Render and Railway support auto-scaling

4. **CDN**
   - Use CDN for static content
   - Reduce server load

---

## 📝 Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | Database host | `db.example.com` |
| `DB_USER` | Database username | `admin` |
| `DB_PASSWORD` | Database password | `secure_pwd_123` |
| `DB_NAME` | Database name | `school_management` |
| `DB_PORT` | Database port | `3306` |
| `CORS_ORIGIN` | Allowed frontend domain | `https://myapp.com` |
| `API_VERSION` | API version | `v1` |

---

## ✅ Deployment Checklist

Before going live:

- [ ] `.env` file contains all production variables
- [ ] Database is created and tables are set up
- [ ] `npm install` runs without errors
- [ ] `npm start` runs locally without errors
- [ ] Health check endpoint returns 200
- [ ] All API endpoints tested locally
- [ ] `.env` file added to `.gitignore`
- [ ] Repository is pushed to GitHub
- [ ] Platform is configured with environment variables
- [ ] Database credentials are correct on platform
- [ ] HTTPS is enabled
- [ ] Error monitoring is set up
- [ ] Backup strategy is in place

---

## 🎉 You're Ready to Deploy!

Your School Management API is now production-ready. Choose your platform and follow the deployment steps above.

For questions or issues, refer to:
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

Happy deploying! 🚀
