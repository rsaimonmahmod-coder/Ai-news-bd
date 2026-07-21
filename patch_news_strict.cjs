const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldPrompt = `Simulate scanning news websites, YouTube, Facebook, Instagram, TikTok, and other sources for trending topics.
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

const newPrompt = `YOU ARE A NEWS CURATOR STRICTLY FOR A BANGLADESHI AUDIENCE.
Generate 6 recent, highly viral potential news headlines and short descriptions.

CRITICAL RULES - READ CAREFULLY:
1. GEOGRAPHY: EVERY SINGLE NEWS ITEM MUST happen in Bangladesh or directly involve Bangladeshi citizens/celebrities/teams. (e.g., Dhaka, Chattogram, Sylhet, BD Cricket Team).
2. NO INTERNATIONAL NEWS: Do NOT mention USA, Europe, India, Pakistan, or international pop culture unless it involves Bangladesh directly.
3. TOPICS TO INCLUDE:
   - Shocking/Sad local news (e.g., local crime, accidents, dramatic incidents in BD).
   - BD Politics (e.g., Student movements, protests, BNP, Awami League, current govt).
   - BD Sports (e.g., Bangladesh Cricket Board, Shakib Al Hasan, local football).
   - Emotional/Surprising local human interest stories.
4. TONE: Make them sound like real, breaking news or trending topics that are currently going viral on BD Facebook/YouTube.
5. SOURCE: Must be BD realistic sources (e.g., "Jamuna TV", "Somoy TV", "Prothom Alo", "Channel 24", "BD Facebook Trends").

Format as JSON array of objects.`;

code = code.replace(oldPrompt, newPrompt);
fs.writeFileSync('server.ts', code);
console.log("Patched server.ts prompt to be strictly BD");
