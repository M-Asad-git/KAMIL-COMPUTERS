#!/bin/bash

# Script to set up admin panel in a separate repository for GitHub Pages deployment

echo "🚀 Setting up Kamil Computers Admin Panel Repository"
echo "=================================================="

# Check if we're in the right directory
if [ ! -d "apps/admin" ]; then
    echo "❌ Error: Please run this script from the root of your kamil-computers project"
    exit 1
fi

# Create admin repository directory
ADMIN_REPO_NAME="kamil-computers-admin"
echo "📁 Creating directory: $ADMIN_REPO_NAME"
mkdir -p "../$ADMIN_REPO_NAME"
cd "../$ADMIN_REPO_NAME"

# Initialize git
echo "🔧 Initializing git repository"
git init

# Copy admin app files
echo "📋 Copying admin application files"
cp -r "../kamil-computers/apps/admin/"* .

# Copy deployment workflow
echo "⚙️ Setting up GitHub Actions workflow"
mkdir -p .github/workflows
cp "../kamil-computers/.github/workflows/deploy-admin-template.yml" ".github/workflows/deploy.yml"

# Create .gitignore
echo "📝 Creating .gitignore"
cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/

# Production
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel
EOF

# Create README
echo "📖 Creating README.md"
cat > README.md << EOF
# Kamil Computers - Admin Panel

Admin panel for managing Kamil Computers products.

## 🚀 Live Demo

- **Admin Panel**: [Your GitHub Pages URL]
- **API**: https://kamil-apis.vercel.app/api
- **Main Website**: [Your main website URL]

## 🛠️ Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## 🌐 Deployment

This repository automatically deploys to GitHub Pages when you push to the main branch.

## 🔧 Configuration

The admin panel connects to the API at: \`https://kamil-apis.vercel.app/api\`

## 📞 Support

For support, refer to the main Kamil Computers repository.
EOF

# Create .nojekyll for GitHub Pages
touch .nojekyll

echo ""
echo "✅ Admin repository setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. cd ../$ADMIN_REPO_NAME"
echo "2. git add ."
echo "3. git commit -m 'Initial admin panel setup'"
echo "4. Create a new repository on GitHub named '$ADMIN_REPO_NAME'"
echo "5. git remote add origin https://github.com/yourusername/$ADMIN_REPO_NAME.git"
echo "6. git push -u origin main"
echo "7. Enable GitHub Pages in repository settings"
echo ""
echo "🌐 Your admin panel will be available at:"
echo "   https://yourusername.github.io/$ADMIN_REPO_NAME"