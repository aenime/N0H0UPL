# Deployment Guide

This guide covers deploying the Karuna For All application to various cloud platforms.

## 🚀 Render.com Deployment

### Prerequisites
- GitHub repository with the project
- Render.com account
- Environment variables configured

### Step 1: Platform Detection Fix
The project includes deployment configuration files to ensure proper platform detection:

- **`render.yaml`** - Render service configuration
- **`.nvmrc`** - Node.js version specification (22.14.0)
- **`Procfile`** - Process management for Heroku-style deployments
- **`.buildpacks`** - Forces Node.js buildpack detection
- **`package.json`** - Includes engine specifications

### Step 2: Create Render Service

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Service Configuration**
   ```yaml
   Name: karuna-for-all
   Environment: Node
   Region: Oregon (US West)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

3. **Environment Variables**
   Set these in Render dashboard:
   ```
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=your_render_url
   ```

### Step 3: Build Configuration

The `render.yaml` file automatically configures:
- Node.js environment
- Build and start commands
- Health check endpoint
- Auto-deployment from main branch

### Step 4: Troubleshooting Common Issues

#### Issue: Platform Detected as Python
**Solution**: The project now includes proper buildpack configuration.

#### Issue: Missing Dependencies
**Solution**: Ensure all dependencies are in `package.json`:
```bash
npm install mongoose axios sharp puppeteer uuid @types/uuid @types/mongoose
```

#### Issue: Build Timeouts
**Solution**: Increase build timeout in Render dashboard or optimize build:
```json
{
  "scripts": {
    "build": "next build",
    "build:production": "NODE_ENV=production next build"
  }
}
```

## 🔧 Vercel Deployment

### Quick Deploy
```bash
npm install -g vercel
vercel --prod
```

### Configuration
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
```

## ☁️ AWS Deployment

### Using AWS Amplify
1. Connect GitHub repository
2. Set build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Using EC2 with PM2
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "karuna-for-all" -- start

# Setup auto-restart
pm2 startup
pm2 save
```

## 🌐 Environment Variables

### Required Variables
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
MONGODB_URI=mongodb://username:password@host:port/database
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com
```

### Optional Variables
```env
# Image upload settings
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./public/uploads

# Scraping settings
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
FACEBOOK_PIXEL_ID=PIXEL_ID
```

## 🔐 Security Configuration

### Content Security Policy
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 📊 Monitoring & Logging

### Performance Monitoring
- Enable Next.js analytics
- Use Render metrics dashboard
- Setup uptime monitoring

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for application monitoring

## 🚨 Troubleshooting

### Common Build Errors

#### 1. TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Fix common issues
npm install @types/node @types/react @types/react-dom
```

#### 2. Memory Issues
Add to `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
  }
}
```

#### 3. Missing Sharp for Image Optimization
```bash
npm install sharp
```

### Platform-Specific Issues

#### Render.com
- Check build logs in dashboard
- Verify Node.js version compatibility
- Ensure all environment variables are set

#### Vercel
- Check function timeout limits
- Verify API routes are properly configured
- Monitor bandwidth usage

### Database Connection Issues
```javascript
// Connection retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};
```

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed and locked
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Build passes locally
- [ ] TypeScript compilation successful
- [ ] Security headers configured
- [ ] Error handling implemented
- [ ] Monitoring setup complete
- [ ] SSL/TLS certificate configured
- [ ] Domain configured and DNS updated

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Render
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test
```

This deployment guide should help resolve the current Render deployment issues and provide comprehensive deployment options for various platforms.
