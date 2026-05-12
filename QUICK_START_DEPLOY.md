# 🚀 Quick Start - Deploy in 5 Minutes

Choose your platform and follow the steps. Takes about 5 minutes!

---

## Option 1: Deploy on Render (Recommended for Beginners)

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Go to Render
1. Visit [render.com](https://render.com)
2. Click **Sign Up** (free account)
3. Connect GitHub account

### Step 3: Create Web Service
1. Click **New** → **Web Service**
2. Select your repository
3. Fill in:
   - **Name:** `school-management-api`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Click **Create Web Service**

### Step 4: Add Environment Variables
1. Click **Environment** tab
2. Add variables (click **Add Variable** for each):
   ```
   NODE_ENV = production
   DB_HOST = [your database host]
   DB_USER = [your database user]
   DB_PASSWORD = [your database password]
   DB_NAME = school_management
   DB_PORT = 3306
   CORS_ORIGIN = https://your-frontend-domain.com
   API_VERSION = v1
   ```

### Step 5: Done! 🎉
- Render deploys automatically
- Your API URL: `https://school-management-api.onrender.com`
- Test: `curl https://school-management-api.onrender.com/`

---

## Option 2: Deploy on Railway

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### Step 2: Go to Railway
1. Visit [railway.app](https://railway.app)
2. Click **Start Project**
3. Click **Deploy from GitHub repo**
4. Connect GitHub account
5. Select your repository

### Step 3: Add MySQL Database
1. Click **+ New**
2. Select **MySQL**
3. Railway auto-configures connection

### Step 4: Set Environment Variables
1. Select your web service
2. Go to **Variables**
3. Add:
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

### Step 5: Deploy
- Railway automatically deploys!
- Your API URL shown in dashboard
- Test it immediately

---

## Test Your Deployed API

### Check Health
```bash
curl https://your-api-url/api/health
```

You should see:
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

### Get All Schools
```bash
curl https://your-api-url/api/schools
```

---

## Database Setup

### Using Managed Database (Easiest)
- **Railway:** Auto-creates MySQL (included)
- **Render:** Use AWS RDS, PlanetScale, or DigitalOcean

### Setup Your Database
1. Create database named `school_management`
2. Run `schema.sql` file using your database client
3. Or execute:
```sql
CREATE DATABASE school_management;
USE school_management;
-- Then paste contents of schema.sql
```

---

## Common Issues

### "Cannot connect to database"
- Check DB credentials in environment variables
- Verify database is accessible from your platform
- Check firewall allows connections

### "Health check is failing"
- Verify CORS_ORIGIN is set correctly
- Check database connection
- Review server logs on platform

### "API returns 503"
- Database connection issue
- Check credentials again
- Restart application

### "Deployment failed"
- Check logs on platform
- Verify `npm install` works locally
- Ensure Node.js 14+ compatible

---

## Auto-Deploy from GitHub

After first deployment, every `git push` auto-deploys! 🎉

```bash
git add .
git commit -m "New feature"
git push origin main
# Automatic deployment started!
```

---

## Next Steps

1. Connect your frontend to this API
2. Set up error monitoring (Sentry)
3. Configure uptime monitoring
4. Add rate limiting (optional)
5. Scale if needed

---

For detailed information, see:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [PRODUCTION.md](./PRODUCTION.md) - Production configuration

**You're live! 🚀**
