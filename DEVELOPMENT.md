# Portfolio Development Guide 🛠️

This guide will help you add new projects and maintain the portfolio.

## 🚀 Quick Start

### Adding a New React Project
```bash
./add-project.sh my-new-app react
```

### Adding a Vanilla HTML/JS Project
```bash
./add-project.sh my-vanilla-app vanilla
```

## 📋 Manual Project Setup

If you prefer to set up projects manually:

### 1. Create Project Folder
```bash
mkdir your-project-name
cd your-project-name
```

### 2. For React Projects
```bash
npx create-react-app . --template typescript
npm pkg set homepage="/c-portfolio/your-project-name"
```

### 3. Update Workflow
Edit `.github/workflows/deploy-pages.yml` and add:

```yaml
- name: Build your-project-name
  run: |
    cd your-project-name
    npm ci
    npm run build
    mkdir -p ../dist/your-project-name
    cp -r build/* ../dist/your-project-name/
```

### 4. Update Portfolio Index
In the workflow file, add your project to the index page:

```html
<a href="/c-portfolio/your-project-name/" class="project">
  <h3>🎨 Your Project Name</h3>
  <p>Brief description of what your project does</p>
</a>
```

## 🔧 Development Workflow

### Local Development
```bash
cd your-project-folder
npm start
# or for vanilla projects
npm run start
```

### Testing Builds
```bash
npm run build
# Serve the build folder to test
npx serve build
```

### Deployment
Simply push to main branch:
```bash
git add .
git commit -m "Add new project: your-project-name"
git push origin main
```

## 📁 Project Structure

```
c-portfolio/
├── .github/workflows/
│   └── deploy-pages.yml          # Main deployment workflow
├── diff-amp-sim/                 # Example React project
│   ├── public/
│   ├── src/
│   └── package.json
├── your-new-project/              # Your new project
├── add-project.sh                 # Project setup script
├── DEVELOPMENT.md                 # This file
└── README.md                      # Main portfolio README
```

## 🎯 Best Practices

### Project Naming
- Use kebab-case: `my-awesome-project`
- Keep names descriptive but concise
- Avoid spaces and special characters

### Homepage Configuration
Always set the homepage in package.json:
```json
{
  "homepage": "/c-portfolio/your-project-name"
}
```

### Build Output
- React projects build to `build/` folder
- Vanilla projects should build to `build/` folder
- The workflow copies from `build/` to `dist/project-name/`

### Asset Paths
For React projects, assets are handled automatically with the homepage setting.

For vanilla projects, use relative paths:
```html
<link rel="stylesheet" href="./style.css">
<script src="./script.js"></script>
```

## 🐛 Troubleshooting

### Common Issues

**Blank page after deployment:**
- Check that homepage is set correctly in package.json
- Verify build output contains all necessary files
- Check browser console for asset loading errors

**Workflow fails:**
- Check that package.json exists
- Verify npm scripts (start, build) are defined
- Check for syntax errors in workflow YAML

**Assets not loading:**
- For React: ensure homepage field is correct
- For vanilla: use relative paths for assets
- Check that files exist in build output

### Testing Locally
Before deploying, test your build locally:

```bash
# Build your project
npm run build

# Serve the build folder
npx serve build -s

# Test at http://localhost:3000
```

## 📚 Resources

- [Create React App Documentation](https://create-react-app.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contributing

When adding new projects:
1. Follow the naming conventions
2. Test locally before pushing
3. Update this guide if you add new project types
4. Add meaningful descriptions to the portfolio index

---

Happy coding! 🎉
