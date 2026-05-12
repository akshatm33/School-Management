# 🚀 Execute: Deliverable 2 & 3

Complete step-by-step instructions to deploy live API and share Postman collection.

---

## ✅ DELIVERABLE 2: Live API on Render

### Prerequisites
- GitHub account ✓ (already have)
- GitHub repository pushed ✓ (already done)
- Render account (free)

---

### Step 1: Create Render Account

1. Go to https://render.com
2. Click **Sign Up**
3. Click **Continue with GitHub**
4. Authorize Render to access your GitHub
5. Complete signup

---

### Step 2: Deploy Service on Render

1. Go to https://dashboard.render.com
2. Click **New +** button (top right)
3. Select **Web Service**

### Step 3: Connect GitHub Repository

1. Click **Connect GitHub account**
2. Search for: `School-Management`
3. Click **Connect** next to your repository
4. Authorize if prompted

---

### Step 4: Configure Service

Fill in the form:

**Basic Settings:**
- **Name:** `school-management-api`
- **Environment:** Node
- **Region:** Select closest to you (e.g., `Oregon (US West)`)
- **Branch:** `main`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free tier (for testing)

---

### Step 5: Add Environment Variables

Scroll to **Environment** section:

Click **Add Environment Variable** and add:

```
NODE_ENV          production
DB_HOST           localhost
DB_USER           root
DB_PASSWORD       your_password
DB_NAME           school_management
PORT              5000
CORS_ORIGIN       https://school-management-api.onrender.com
```

**Important Notes:**
- Replace `your_password` with your actual MySQL password
- `DB_HOST = localhost` works if using local MySQL
- If using cloud MySQL: use cloud host (AWS RDS, etc.)

---

### Step 6: Deploy

1. Scroll down
2. Click **Create Web Service**
3. Wait for deployment (2-3 minutes)
4. You'll see: "Your service is live" ✅

**Your Live API URL will be:**
```
https://school-management-api.onrender.com
```

---

### Step 7: Test Live API

Once deployed, test the health endpoint:

```
GET https://school-management-api.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "API is running",
  "timestamp": "2026-05-13T10:30:00Z"
}
```

---

### Important: First-Time Deploy

**Your local MySQL might not be accessible from Render!**

#### Solution 1: Use Render MySQL (Recommended)

1. In Render Dashboard → Click **New +** → **MySQL**
2. Configure:
   - **Name:** `school-management-db`
   - **Database:** `school_management`
   - **Username:** `root`
   - **Password:** Create strong password
3. Once created, Render shows connection details
4. Update Web Service environment variables with these details
5. Re-deploy service

#### Solution 2: Use Cloud MySQL

Use AWS RDS, Azure MySQL, or DigitalOcean MySQL:
1. Create database on cloud provider
2. Get connection details
3. Update Render environment variables
4. Re-deploy

#### Solution 3: SSH Tunnel (Advanced)

If you need to use local MySQL:
1. Requires SSH tunnel setup
2. See DEPLOYMENT.md for advanced configuration

---

## ✅ DELIVERABLE 3: Postman Collection - Shareable Link

### Step 1: Create Postman Account

1. Go to https://www.postman.com/downloads/
2. Download **Postman Desktop App** (recommended)
3. Open Postman
4. Click **Sign Up** or **Sign In**
5. Create account with email or GitHub

---

### Step 2: Import Collection

1. In Postman, click **Collections** (left sidebar)
2. Click **Import** button
3. Click **File** tab
4. Browse to: `School_Management_API.postman_collection.json`
5. Click **Import**

---

### Step 3: Create Public Workspace

1. Click **Workspaces** (top left)
2. Click **Create Workspace**
3. Fill in:
   - **Name:** `School Management API`
   - **Type:** **Public** (for sharing)
   - **Description:** `REST API for schools and students - 10 endpoints with production-ready features`
4. Click **Create Workspace**

---

### Step 4: Move Collection to Workspace

1. Go to new workspace
2. You should see import option
3. Import the collection again (or drag it)
4. Collection now appears in this workspace

---

### Step 5: Generate Shareable Link

1. In workspace, find **School_Management_API** collection
2. Click **•••** (three dots menu)
3. Click **Share**
4. Select **Viewers** (read-only access)
5. Copy the **Shareable Link**

**Link format:**
```
https://www.postman.com/collections/YOUR_ID
```

---

### Step 6: Create Production Environment

1. In workspace, click **Environments**
2. Click **Create** → **New Environment**
3. Name it: `Production`
4. Add variables:

```
base_url           https://school-management-api.onrender.com
school_id          1
student_id         1
```

5. Click **Save**

---

### Step 7: Test Against Live API

1. Select **Production** environment (top right dropdown)
2. Go to **Health & Status** → **Health Check**
3. Click **Send**
4. Should see your live API response ✅

---

## 📊 Summary - All 3 Deliverables

### ✅ Deliverable 1: GitHub Repository
- **Status:** DONE
- **URL:** https://github.com/akshatm33/School-Management
- **Branch:** main
- **Access:** Public
- **Contains:** Complete source code + documentation

### ✅ Deliverable 2: Live API on Render
- **Status:** Deploy now (follow steps above)
- **URL:** https://school-management-api.onrender.com
- **Endpoints:** All 10 available
- **Database:** Configure on Render
- **Auto-deploys:** Yes, on every push to main

### ✅ Deliverable 3: Postman Collection
- **Status:** Share now (follow steps above)
- **Type:** Public workspace
- **Access:** Shareable link
- **Endpoints:** 10 endpoints ready to test
- **Environments:** Development + Production

---

## 🎯 Quick Start Commands

### Render Deployment Checklist
- [ ] Create Render account
- [ ] Connect GitHub
- [ ] Create Web Service
- [ ] Add environment variables
- [ ] Deploy
- [ ] Test health endpoint
- [ ] Copy live URL

### Postman Sharing Checklist
- [ ] Create Postman account
- [ ] Import collection
- [ ] Create public workspace
- [ ] Move collection to workspace
- [ ] Generate shareable link
- [ ] Create production environment
- [ ] Test against live API
- [ ] Share link

---

## 📧 Final Sharing Template

**For your team/client:**

```
Subject: 🚀 School Management API - Complete Project

Hi,

I'm sharing the complete School Management API project with 3 deliverables:

📦 DELIVERABLE 1: Source Code Repository
   GitHub: https://github.com/akshatm33/School-Management
   - Complete Node.js/Express API
   - 10 RESTful endpoints
   - MySQL database
   - Production-ready security
   - Full documentation

🚀 DELIVERABLE 2: Live API (Testing)
   Base URL: https://school-management-api.onrender.com
   Health Check: https://school-management-api.onrender.com/api/health
   
   Status: LIVE ✅

🧪 DELIVERABLE 3: Postman Collection (Testing)
   Shareable Link: https://www.postman.com/collections/[YOUR_ID]
   - Import into Postman
   - Select "Production" environment
   - Run all 10 endpoints
   - Auto-tests included

API ENDPOINTS:
✓ GET  /                              → Welcome
✓ GET  /api/health                    → Health check
✓ POST /api/schools/addSchool         → Create school
✓ GET  /api/schools                   → List schools
✓ GET  /api/schools/:id               → Get school
✓ POST /api/students                  → Create student
✓ GET  /api/students                  → List students
✓ GET  /api/students/:id              → Get student
✓ PUT  /api/students/:id              → Update student
✓ DELETE /api/students/:id            → Delete student

QUICK TEST:
1. Open Postman link
2. Select "Production" environment
3. Run "Health & Status" → "Health Check"
4. See live response from https://school-management-api.onrender.com

DOCUMENTATION:
- README.md - Project overview
- POSTMAN_GUIDE.md - How to use collection
- DEPLOYMENT.md - Deployment details
- SECURITY_CHECKLIST.md - Security features

All code is production-ready and fully documented.

Thanks!
```

---

## 🆘 Troubleshooting

### Render Deploy Fails
**Error:** "Build failed"
- Check: Build command is `npm install`
- Check: Start command is `npm start`
- Check: Node version compatibility
- See: DEPLOYMENT.md

### API Returns 503 Error
**Cause:** Database connection failed
- Check: DB_HOST, DB_USER, DB_PASSWORD are correct
- Check: MySQL database exists
- Check: Firewall allows connection
- Solution: Use Render MySQL (easier)

### Postman Link Not Working
**Issue:** Collection not visible
- Check: Workspace is "Public"
- Check: Collection is in workspace
- Solution: Re-generate shareable link

### API Not Responding
**Issue:** 504 Gateway Timeout
- Check: Service is running (Render dashboard)
- Check: Database is connected
- Solution: Re-deploy service on Render

---

**All 3 deliverables ready for production! 🎉**
