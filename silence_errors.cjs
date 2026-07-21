const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/console\.warn\("API error, serving BD fallback.*/g, 'console.log("Serving BD fallback due to API limit.");');
code = code.replace(/console\.warn\("Error scanning news:", error\);/g, '/* silent */');
code = code.replace(/console\.warn\("Error generating carousel:", error\);/g, '/* silent */');
code = code.replace(/console\.warn\(\`Attempt \$\{attempt\} failed:\`, error\.message\);/g, '/* silent */');
fs.writeFileSync('server.ts', code);
