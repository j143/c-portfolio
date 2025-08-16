#!/bin/bash

# Portfolio Project Setup Script
# Usage: ./add-project.sh <project-name> [project-type]

PROJECT_NAME=$1
PROJECT_TYPE=${2:-"react"}

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Error: Please provide a project name"
    echo "Usage: ./add-project.sh <project-name> [project-type]"
    echo "Example: ./add-project.sh my-awesome-app react"
    exit 1
fi

echo "🚀 Setting up new project: $PROJECT_NAME"

# Create project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

if [ "$PROJECT_TYPE" = "react" ]; then
    echo "📦 Creating React TypeScript project..."
    
    # Initialize React app with TypeScript
    npx create-react-app . --template typescript
    
    # Add homepage to package.json
    npm pkg set homepage="/c-portfolio/$PROJECT_NAME"
    
    echo "✅ React project created!"
    
elif [ "$PROJECT_TYPE" = "vanilla" ]; then
    echo "📦 Creating vanilla HTML/JS project..."
    
    # Create basic structure
    mkdir -p src public
    
    # Create package.json
    cat > package.json << EOF
{
  "name": "$PROJECT_NAME",
  "version": "1.0.0",
  "description": "Portfolio project: $PROJECT_NAME",
  "homepage": "/c-portfolio/$PROJECT_NAME",
  "scripts": {
    "build": "cp -r src/* build/",
    "start": "python3 -m http.server 3000 --directory src"
  },
  "dependencies": {}
}
EOF

    # Create basic HTML structure
    cat > src/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$PROJECT_NAME</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Welcome to $PROJECT_NAME</h1>
        <p>Your project starts here!</p>
    </div>
    <script src="script.js"></script>
</body>
</html>
EOF

    # Create basic CSS
    cat > src/style.css << EOF
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 2rem;
    background: #f5f5f5;
}

#app {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}
EOF

    # Create basic JavaScript
    cat > src/script.js << EOF
console.log('$PROJECT_NAME loaded!');

// Your JavaScript code here
EOF

    echo "✅ Vanilla project created!"
fi

cd ..

echo ""
echo "🎯 Next steps:"
echo "1. Update .github/workflows/deploy-pages.yml to include your project"
echo "2. Add your project to the main index page in the workflow"
echo "3. Develop your project in the $PROJECT_NAME folder"
echo "4. Commit and push to deploy!"
echo ""
echo "📁 Project created at: ./$PROJECT_NAME"
