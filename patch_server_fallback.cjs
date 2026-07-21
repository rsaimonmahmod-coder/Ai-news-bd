const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /headline: "BREAKING",\s*subheading: req\.body\.title \|\| "VIRAL NEWS UPDATE",/g,
  'headline: req.body.title || "VIRAL NEWS UPDATE",\n            subheading: req.body.description || "The story is developing rapidly across social media platforms.",'
);

code = code.replace(
  /headline: "THE DETAILS",\s*subheading: "What you need to know",/g,
  'headline: req.body.title || "THE DETAILS",\n            subheading: req.body.description || "What you need to know",'
);

fs.writeFileSync('server.ts', code);
console.log("Patched server.ts fallback text");
