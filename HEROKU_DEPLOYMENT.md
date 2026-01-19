# Heroku Deployment Guide

## Prerequisites
- Heroku account
- Heroku CLI installed
- Git repository initialized

## Deployment Steps

### 1. Create Heroku App
```bash
heroku create silvas-accounting-app
```

### 2. Add MySQL Database (ClearDB)
```bash
heroku addons:create cleardb:ignite
```

### 3. Get Database URL
```bash
heroku config:get CLEARDB_DATABASE_URL
```

### 4. Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-jwt-key-change-this
heroku config:set JWT_EXPIRES_IN=24h

# If ClearDB requires SSL
heroku config:set DB_SSL=true
```

### 5. Configure Database URL (if needed)
If ClearDB URL is not set as DATABASE_URL automatically:
```bash
heroku config:set DATABASE_URL=mysql://user:password@host:3306/database
```

### 6. Deploy
```bash
git add .
git commit -m "Configure for Heroku deployment"
git push heroku main
```

Or if on a different branch:
```bash
git push heroku copilot/create-nodejs-api-structure:main
```

### 7. Run Migrations & Seeders
Migrations and Seeders run automatically via the release phase in Procfile.
The release command is configured to:
1. Run pending migrations
2. Run pending seeders (tracked via SequelizeData table)

### 8. Verification (Optional)
You can verify the database state:
```bash
heroku run npx sequelize-cli db:migrate:status
```

### 9. Open Application
```bash
heroku open
```

## Buildpack Configuration

Heroku should automatically detect Node.js. If needed:
```bash
heroku buildpacks:set heroku/nodejs
```

## Logs

View application logs:
```bash
heroku logs --tail
```

## Scale

Ensure at least one web dyno is running:
```bash
heroku ps:scale web=1
```

## Environment Variables Overview

Required:
- `DATABASE_URL` - Set automatically by ClearDB
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV=production` - Enables production mode

Optional:
- `DB_SSL=true` - Enable SSL for MySQL (required by some providers)
- `JWT_EXPIRES_IN=24h` - JWT token expiration

## How It Works

1. **heroku-postbuild**: Automatically builds React frontend after backend dependencies install
2. **release phase**: Runs database migrations before new version goes live
3. **web dyno**: Serves API on `/api/*` and React app on all other routes
4. **Static serving**: Express serves React build files in production

## Testing Locally

Simulate production environment:
```bash
NODE_ENV=production npm run build:frontend
NODE_ENV=production npm start
```

Visit `http://localhost:3000` - backend serves the React app.

## Troubleshooting

### Build Fails
- Check Heroku logs: `heroku logs --tail`
- Verify Node version in _frontend/package.json engines matches Heroku

### Database Connection Issues
- Verify DATABASE_URL: `heroku config:get DATABASE_URL`
- Check if SSL is required: `heroku config:set DB_SSL=true`

### Frontend Not Loading
- Ensure frontend build succeeded: Check Heroku build logs
- Verify NODE_ENV is set to production
- Check that build folder exists in deployment

### API Routes Not Working
- Ensure all API routes start with `/api`
- Check CORS configuration if needed
