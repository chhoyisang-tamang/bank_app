# Bank App Deployment Guide

## Overview

This guide explains how to deploy the Bank App to various platforms.

## Prerequisites

- Project is fully built and tested locally
- All dependencies installed (`npm install`)
- Build passes without errors (`npm run build`)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy a Vite React app.

#### Steps:

1. **Install Vercel CLI** (if not already installed)

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Select project directory
   - Confirm deployment settings
   - Vercel will automatically detect Vite configuration

#### Auto-Deployment from Git

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Benefits:**

- Automatic deployments on push
- Free SSL certificate
- Custom domains
- Environment variables support

---

### Option 2: Netlify

#### Steps:

1. **Build your project**

   ```bash
   npm run build
   ```

2. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

3. **Login to Netlify**

   ```bash
   netlify login
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

#### Using Git Integration

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Features:**

- Free tier available
- Continuous deployment
- Custom domain support
- Pre-built functions

---

### Option 3: Quick Deploy Commands

#### Vercel

```bash
npm i -g vercel
vercel
```

#### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 🔧 Environment Configuration

### Production Environment Variables

Create a `.env.production` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Bank App
VITE_ENVIRONMENT=production
```

---

## 📋 Pre-Deployment Checklist

- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run build` - Build succeeds
- [ ] Test all features locally
- [ ] Check responsive design on mobile
- [ ] Test on different browsers
- [ ] Update version in package.json
- [ ] Test with production build: `npm run preview`

---

## 🔐 Security Considerations

1. **Remove sensitive data**
   - No API keys in code
   - No passwords in repository
   - No personal information

2. **Enable HTTPS**
   - All platforms support HTTPS
   - Always use HTTPS for production

3. **Configure CORS**
   - If using backend API
   - Set allowed origins

---

## 📊 Production Build

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to any static hosting service.

---

**For detailed deployment instructions, check:**

- **Vercel**: https://vercel.com/docs
- **Netlify**: https://docs.netlify.com
- **Vite**: https://vitejs.dev/guide/static-deploy.html

**Happy Deploying! 🚀**

Last Updated: January 2026
