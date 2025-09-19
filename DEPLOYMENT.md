# Kamil Computers - Deployment Guide

This guide explains how to deploy your Kamil Computers application to GitHub Pages.

## Architecture Overview

- **Backend API**: Deployed on Vercel at `https://kamil-apis.vercel.app` (stays on Vercel)
- **Website**: Customer-facing site deployed on GitHub Pages
- **Admin Panel**: Admin interface deployed separately on GitHub Pages

## Prerequisites

1. Your backend API must be deployed and running on Vercel
2. GitHub repository with GitHub Pages enabled
3. Repository secrets configured (if needed)

## Deployment Steps

### 1. Backend Deployment (Already Done)
Your backend is already deployed at `https://kamil-apis.vercel.app/api`

### 2. Website Deployment to GitHub Pages

The website will automatically deploy when you push to the `main` branch.

#### Repository Configuration:
1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"

#### If your repository is NOT named `username.github.io`:
1. Uncomment and update the `basePath` in `apps/website/next.config.ts`:
   ```typescript
   basePath: '/your-repo-name',
   ```

### 3. Admin Panel Deployment

Since GitHub Pages can only serve one site per repository, deploy the admin panel to a separate repository:

#### Step-by-Step Admin Deployment:

1. **Create a new repository** for the admin panel:
   - Repository name: `kamil-computers-admin` (or similar)
   - Make it public (required for free GitHub Pages)

2. **Copy admin files to the new repository**:
   ```bash
   # Create new directory
   mkdir kamil-computers-admin
   cd kamil-computers-admin
   
   # Initialize git
   git init
   
   # Copy admin app files
   cp -r ../kamil-computers/apps/admin/* .
   
   # Copy the admin deployment workflow
   mkdir -p .github/workflows
   cp ../kamil-computers/.github/workflows/deploy-admin-template.yml .github/workflows/deploy.yml
   
   # Create package.json in root (copy from apps/admin/package.json)
   cp package.json ./package.json
   ```

3. **Set up GitHub Pages**:
   - Push to GitHub
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

4. **Update CORS in your backend** (add your admin URL):
   - Add your admin GitHub Pages URL to the FRONTEND_URLS in your Vercel environment variables

## Environment Variables

### Production URLs
- **API URL**: `https://kamil-apis.vercel.app/api`
- **Website**: `https://yourusername.github.io` (or `https://yourusername.github.io/repo-name`)

### Backend CORS Configuration
Your backend is already configured to allow:
- `*.github.io` domains
- Your Vercel deployments
- Local development URLs

## File Structure After Deployment

```
your-repo/
├── apps/
│   ├── website/          # Customer website
│   ├── admin/           # Admin panel
│   └── apis/            # Backend API (deployed to Vercel)
├── .github/
│   └── workflows/
│       └── deploy-website.yml  # GitHub Actions workflow
└── DEPLOYMENT.md        # This file
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your GitHub Pages URL is added to the backend CORS configuration
2. **API Not Found**: Verify the API URL in environment variables
3. **Images Not Loading**: Check that image URLs are correctly pointing to your Vercel backend
4. **404 on Refresh**: This is normal for SPAs on GitHub Pages. Users should navigate via the app.

### Testing Your Deployment:

1. Visit your GitHub Pages URL
2. Check that products load correctly
3. Verify images display properly
4. Test WhatsApp integration

## Next Steps

1. **Custom Domain** (Optional): Set up a custom domain in GitHub Pages settings
2. **SSL Certificate**: GitHub Pages provides HTTPS automatically
3. **Analytics**: Add Google Analytics or similar tracking
4. **SEO**: Add meta tags and sitemap for better search engine visibility

## Support

If you encounter issues:
1. Check the GitHub Actions logs for build errors
2. Verify your API is responding at `https://kamil-apis.vercel.app/api/products`
3. Check browser console for JavaScript errors