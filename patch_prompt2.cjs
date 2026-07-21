const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldPrompt = `YOU ARE A NEWS CURATOR STRICTLY FOR A BANGLADESHI AUDIENCE.
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

Format as JSON array of objects.

Format as JSON array of objects:
[
  {
    "id": "unique-string",
    "title": "Headline here",
    "description": "Short 1-2 sentence description",
    "category": "sports",
    "source": "YouTube Trending",
    "isLive": true,
    "timeAgo": "10m ago",
    "viralityScore": 95
  }
]
Return ONLY valid JSON.
\`;`;

const newPrompt = `Generate exactly 6 highly viral news items. 
MANDATORY CONSTRAINT: EVERY SINGLE NEWS ITEM MUST BE STRICTLY ABOUT BANGLADESH.
Do NOT include any news about USA, UK, India, TikTok international stars, Hollywood, or anything outside of Bangladesh.

Categories to mix in:
- Shocking/Sad Bangladesh local news (murders, crimes, accidents in Dhaka/Chittagong etc.)
- Bangladesh Politics (Awami League, BNP, student movements, statements by politicians)
- Bangladesh Sports (Bangladesh Cricket Board, Shakib Al Hasan, Tamim Iqbal, local football)
- Emotional/Surprising/Heart-touching Bangladesh human interest stories.

Make the headlines extremely click-worthy, dramatic, and emotionally charged so people stop scrolling. Use realistic local sources like 'Jamuna TV', 'Prothom Alo', 'Somoy TV'.
Scores must be between 85 and 99.

Format as JSON array of objects:
[
  {
    "id": "unique-string",
    "title": "Headline here",
    "description": "Short 1-2 sentence description",
    "category": "politics",
    "source": "Jamuna TV",
    "isLive": true,
    "timeAgo": "10m ago",
    "viralityScore": 95
  }
]
Return ONLY valid JSON.\`;`;

code = code.replace(oldPrompt, newPrompt);
fs.writeFileSync('server.ts', code);
console.log("Patched prompt 2");
