# Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend API (Already Done ✅)
- [x] Backend deployed to Vercel at `https://kamil-apis.vercel.app`
- [x] Database connected and working
- [x] CORS configured for GitHub Pages domains

### Website Deployment
- [ ] Repository pushed to GitHub
- [ ] GitHub Pages enabled in repository settings
- [ ] GitHub Actions workflow running successfully
- [ ] Website accessible at GitHub Pages URL
- [ ] Products loading correctly from API
- [ ] Images displaying properly
- [ ] WhatsApp integration working

### Admin Panel Deployment
- [ ] Run `./scripts/setup-admin-repo.sh` to create admin repository
- [ ] Create new GitHub repository for admin panel
- [ ] Push admin code to new repository
- [ ] Enable GitHub Pages for admin repository
- [ ] Admin panel accessible at GitHub Pages URL
- [ ] Admin can login successfully
- [ ] Product CRUD operations working
- [ ] Image uploads working through API

## 🔧 Configuration Updates Needed

### 1. Update Phone Number
Update WhatsApp phone number in:
- `apps/website/src/app/products/page.tsx` (line with `+923298135729`)
- `apps/website/src/app/products/[id]/page.tsx` (line with `+923298135729`)

### 2. Update Repository Name (If Needed)
If your repository is NOT named `username.github.io`, uncomment and update:
- `apps/website/next.config.ts` - add `basePath: '/your-repo-name'`
- `apps/admin/next.config.ts` - add `basePath: '/your-repo-name'`

### 3. Update CORS for Admin Panel
After deploying admin panel, add the admin URL to your Vercel environment variables:
- Go to Vercel dashboard → Your API project → Settings → Environment Variables
- Update `FRONTEND_URLS` to include your admin GitHub Pages URL

## 🚀 Deployment Commands

### Deploy Website (Automatic)
```bash
git add .
git commit -m "Deploy website updates"
git push origin main
```

### Deploy Admin Panel (One-time setup)
```bash
# Run the setup script
./scripts/setup-admin-repo.sh

# Follow the instructions printed by the script
cd ../kamil-computers-admin
git add .
git commit -m "Initial admin panel setup"
# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/kamil-computers-admin.git
git push -u origin main
```

## 🧪 Testing After Deployment

### Website Testing
- [ ] Visit your GitHub Pages URL
- [ ] Check products page loads
- [ ] Test search functionality
- [ ] Verify images load correctly
- [ ] Test WhatsApp button
- [ ] Check responsive design on mobile

### Admin Panel Testing
- [ ] Visit admin GitHub Pages URL
- [ ] Test login functionality
- [ ] Create a test product
- [ ] Upload test images
- [ ] Edit existing product
- [ ] Delete test product
- [ ] Verify changes appear on main website

## 🌐 Final URLs

After deployment, your URLs will be:
- **Website**: `https://yourusername.github.io/[repo-name]`
- **Admin**: `https://yourusername.github.io/kamil-computers-admin`
- **API**: `https://kamil-apis.vercel.app/api` (unchanged)

## 🆘 Troubleshooting

### Common Issues:
1. **Build fails**: Check GitHub Actions logs
2. **API not accessible**: Verify CORS settings
3. **Images not loading**: Check image URL configuration
4. **404 on page refresh**: Normal for SPAs on GitHub Pages

### Getting Help:
1. Check GitHub Actions logs for build errors
2. Test API directly: `https://kamil-apis.vercel.app/api/products`
3. Check browser console for JavaScript errors
4. Verify environment variables are set correctly