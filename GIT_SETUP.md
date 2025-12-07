# Git Setup Guide

## Current Status
❌ Git is not installed on your system

## Install Git

### Windows
1. Download from: https://git-scm.com/download/win
2. Run the installer
3. Choose default options
4. Restart your terminal/VS Code

### After Installation

Once Git is installed, run these commands in this folder:

```powershell
# Initialize repository
git init

# Configure Git (replace with your info)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Wood Camp Pharma website"

# Check status
git status
```

## Quick Git Commands

```powershell
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your message here"

# View history
git log

# Create a branch
git branch feature-name
git checkout feature-name

# Switch branches
git checkout main
```

## GitHub (Optional)

If you want to push to GitHub:

1. Create account at https://github.com
2. Create a new repository
3. Follow the instructions to connect:
   ```powershell
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

## Files Included

- `.gitignore` - Already created (excludes node_modules, logs, etc)
- `.git/` - Will be created after `git init`

Need help? Visit: https://git-scm.com/doc
