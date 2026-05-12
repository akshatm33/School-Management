# 🔒 Production Configuration Guide

This guide explains all production-ready settings for the School Management API.

---

## Environment Setup

### Development Environment (`.env`)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=school_management
DB_PORT=3306
API_VERSION=v1
```

### Production Environment (Set in Platform)
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-production-database.com
DB_USER=prod_user
DB_PASSWORD=super_secure_password_123!@#
DB_NAME=school_management
DB_PORT=3306
CORS_ORIGIN=https://your-frontend-domain.com
API_VERSION=v1
```

---

## Security Settings

### 1. CORS Configuration

**Development (allows all origins):**
```javascript
CORS_ORIGIN=*
```

**Production (specific domain only):**
```javascript
CORS_ORIGIN=https://yourdomain.com
```

### 2. Security Headers (Automatically Applied)

The API automatically sets security headers:
- `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
- `X-Frame-Options: DENY` - Prevent clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enable XSS filtering

### 3. Request Size Limits

Maximum request payload: **10KB**

```javascript
app.use(express.json({ limit: '10kb' }));
```

### 4. Database Security

**Best Practices:**
- Use strong passwords (16+ characters, mix of uppercase, lowercase, numbers, symbols)
- Store credentials in platform environment variables only
- Use managed database services for automatic backups
- Enable SSL for database connections (if available)
- Restrict database access to application IP only

**Example Strong Password:**
```
Pr0d@ctN0de!2024#Sec
```

### 5. HTTPS/TLS

- All cloud platforms provide free SSL certificates
- Automatic HTTPS enforcement
- Both Render and Railway redirect HTTP → HTTPS

---

## Performance Optimization

### Connection Pooling
```javascript
connectionLimit: 10
```
- Maximum 10 concurrent database connections
- Prevents connection exhaustion
- Automatic connection recycling

### Request Timeout
- 30 seconds (Node.js default)
- Prevent hanging requests
- Graceful error handling

### Error Handling
- Stack traces shown only in development
- Production errors show generic messages
- No sensitive data exposed in responses

---

## Monitoring & Health Checks

### Health Check Endpoint
```
GET /api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "statusCode": 200,
  "timestamp": "2024-05-12T10:30:00.000Z"
}
```

### Auto Health Checks (Recommended)

**For Render:**
- Add health check: `Settings` → `Health Check Path` → `/api/health`

**For Railway:**
- Add health check: `Monitoring` → `Health Checks` → Set to `/api/health`

### Expected Response Time
- Healthy: < 200ms
- Slow: 200-500ms
- Timeout: > 30s (restart)

---

## Graceful Shutdown

The API handles graceful shutdown for:

1. **SIGTERM** (Cloud platform shutdown signal)
   - Closes server connection
   - Waits for in-flight requests
   - Closes database pool
   - Exit cleanly

2. **SIGINT** (Ctrl+C locally)
   - Same graceful shutdown process

```javascript
server.close(() => {
  console.log('✅ Server closed');
  process.exit(0);
});
```

---

## Database Setup for Production

### Option 1: AWS RDS MySQL
```env
DB_HOST=rds-instance.xxxxx.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=your_secure_password
```

### Option 2: PlanetScale (MySQL-compatible)
```env
DB_HOST=your-database.psdb.cloud
DB_PORT=3306
DB_USER=xxxxx
DB_PASSWORD=pscale_pw_xxxxxxxxxxxxx
```

### Option 3: DigitalOcean MySQL
```env
DB_HOST=db-xxx-do-user-xxx.db.ondigitalocean.com
DB_PORT=25060
DB_USER=doadmin
DB_PASSWORD=your_secure_password
```

---

## Deployment Checklist

### Code Quality
- [ ] All dependencies installed (`npm install`)
- [ ] No console.log() left in production code
- [ ] All environment variables documented
- [ ] Error messages don't expose system details

### Security
- [ ] `.env` file NOT committed to git
- [ ] Database credentials are strong
- [ ] CORS_ORIGIN set to your domain
- [ ] NODE_ENV=production
- [ ] HTTPS enabled on platform

### Database
- [ ] Database created
- [ ] Schema applied (tables created)
- [ ] Connection tested from application
- [ ] Backups configured
- [ ] SSL enabled (if available)

### Testing
- [ ] Health check returns 200
- [ ] Create school endpoint tested
- [ ] Create student endpoint tested
- [ ] Get all endpoints tested
- [ ] Invalid requests return proper errors
- [ ] Database performance acceptable

### Monitoring
- [ ] Error tracking enabled (Sentry, etc.)
- [ ] Uptime monitoring configured
- [ ] Logs accessible
- [ ] Alerts set up for failures

### Documentation
- [ ] Database credentials stored securely
- [ ] API documentation up to date
- [ ] Deployment steps documented
- [ ] Rollback plan documented

---

## Common Production Issues

### Issue: 503 Service Unavailable
**Cause:** Database connection failed
**Solution:**
- Verify database credentials
- Check database is running
- Check firewall rules
- Review error logs

### Issue: 500 Internal Server Error
**Cause:** Unhandled error in code
**Solution:**
- Check server logs
- Verify environment variables
- Test locally with same config
- Check database is accessible

### Issue: Slow Response Times
**Cause:** Database queries slow or no indexes
**Solution:**
- Add database indexes
- Optimize queries
- Check connection pool settings
- Monitor database performance

### Issue: Memory Leaks
**Cause:** Connections not released
**Solution:**
- Ensure `connection.release()` called
- Check for unclosed resources
- Monitor memory usage
- Review logs for errors

---

## Scaling Considerations

### Vertical Scaling (Increase resource)
- Upgrade to higher tier on platform
- Increase RAM and CPU
- Suitable for steady growth

### Horizontal Scaling (Multiple instances)
- Both Render and Railway support multiple instances
- Add load balancer
- Shared database between instances

### Database Optimization
- Add indexes to frequently queried columns
- Use read replicas for heavy queries
- Consider caching layer (Redis)

---

## Recovery & Backup

### Database Backups
- Automatic backups for managed services
- Point-in-time recovery available
- Test recovery procedures regularly

### Application Recovery
- Automatic restart on failure
- Graceful shutdown procedures
- Clear error logging

### Disaster Recovery Plan
1. Database goes down: Switch to backup
2. Application crashes: Auto-restart enabled
3. Code bug: Rollback to previous commit
4. Complete failure: Restore from backup

---

## Compliance & Best Practices

### Data Protection
- ✅ Use HTTPS for all connections
- ✅ Encrypt passwords in database (consideration for future)
- ✅ Validate all inputs
- ✅ Sanitize error messages
- ✅ Log security events

### API Security
- ✅ Rate limiting (consider adding)
- ✅ Input validation
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS properly configured
- ✅ Security headers set

### Monitoring
- ✅ Uptime monitoring
- ✅ Error logging
- ✅ Performance monitoring
- ✅ Security event logging
- ✅ Alert system

---

## Support & Resources

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Last Updated:** May 12, 2024
**Status:** ✅ Production Ready
