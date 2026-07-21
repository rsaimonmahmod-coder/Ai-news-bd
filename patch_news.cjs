const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldPrompt = `Simulate scanning news websites, YouTube, Facebook, Instagram, TikTok, and other sources for trending topics.
Generate 6 recent, highly viral potential news headlines and short descriptions.
They should be across various categories: Politics, Sports, Business, Tech, Entertainment, Health.
Make them sound like real breaking news or trending topics that are currently going viral.
Assign a 'viralityScore' to each. ALL items must have a virality score ABOVE 80 (between 81 and 99).
The 'source' should be realistic (e.g., "YouTube News", "TikTok Trends", "BBC News", "Facebook Live", "Instagram Reels", "Local News").`;

const newPrompt = `Simulate scanning news websites, YouTube, Facebook, Instagram, TikTok, and other sources for trending topics.
Generate 6 recent, highly viral potential news headlines and short descriptions.
CRITICAL REQUIREMENTS:
1. ONLY include Bangladesh news and Bangladesh-related news.
2. Include news that is shocking, sad (e.g. murder, crime).
3. Include politics.
4. Include famous sports and sports statements (Bangladesh context, e.g., cricket, football).
5. Include happy, emotional, shocking, surprising news that will make people stop scrolling and read.
6. Absolutely NO international or general TikTok news unless it is directly about Bangladesh or highly relevant to Bangladeshi people.
Assign a 'viralityScore' to each. ALL items must have a virality score ABOVE 80 (between 81 and 99).
The 'source' should be realistic (e.g., "Local News", "Facebook Live", "Jamuna TV", "Somoy TV", "Prothom Alo").`;

code = code.replace(oldPrompt, newPrompt);
fs.writeFileSync('server.ts', code);
console.log("Patched server.ts prompt");
