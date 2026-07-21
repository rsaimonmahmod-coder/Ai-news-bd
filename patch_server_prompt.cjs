const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldPrompt = `Slide 1 should be a highly attractive, professional Hook/Headline that demands attention.`;
const newPrompt = `Slide 1 headline MUST BE the actual main News Title (do not use generic words like "BREAKING"). The subheading should be the News Description.`;

code = code.replace(oldPrompt, newPrompt);

const oldPrompt2 = `"headline": "ATTRACTIVE SHORT HEADLINE",`;
const newPrompt2 = `"headline": "ACTUAL NEWS HEADLINE HERE (NO GENERIC WORDS)",`;
code = code.replace(oldPrompt2, newPrompt2);

fs.writeFileSync('server.ts', code);
console.log("Patched server.ts prompt text");
