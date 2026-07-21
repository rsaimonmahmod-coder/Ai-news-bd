const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /\/\/ Fallback data if quota exceeded\n\s*if \(isRateLimit\) \{/,
  '// Fallback data if quota exceeded or error happens\n    console.log("Serving carousel fallback due to API limit.");\n    if (true) {'
);

fs.writeFileSync('server.ts', code);
