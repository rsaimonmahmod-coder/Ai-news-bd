const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldFallback = `
    // Fallback data if quota exceeded
    if (isRateLimit) {
      return res.json({
        news: [
          {
            id: "fallback-1",
            title: "Viral Sensation Takes TikTok By Storm",
            description: "A new trend has captured the attention of millions across the country, sparking conversations and parodies online.",
            category: "entertainment",
            source: "TikTok Trends",
            isLive: true,
            timeAgo: "2m ago",
            viralityScore: 98
          },
          {
            id: "fallback-2",
            title: "Major Tech Announcement Streams Live to Millions",
            description: "The latest product reveal is breaking viewership records on YouTube as fans tune in globally.",
            category: "technology",
            source: "YouTube Tech",
            isLive: true,
            timeAgo: "15m ago",
            viralityScore: 92
          },
          {
            id: "fallback-3",
            title: "Unexpected Comeback in Final Over Goes Viral",
            description: "Cricket fans are losing their minds over the spectacular finish in last night's match.",
            category: "sports",
            source: "Facebook Live",
            isLive: false,
            timeAgo: "1h ago",
            viralityScore: 89
          },
          {
            id: "fallback-4",
            title: "Local Market Hits All-Time High",
            description: "Economic indicators show unprecedented growth, causing a stir among local investors.",
            category: "business",
            source: "Local News",
            isLive: true,
            timeAgo: "2h ago",
            viralityScore: 85
          }
        ]
      });
    }
`;

const newFallback = `
    // Fallback data if quota exceeded or error happens
    console.error("API error, serving BD fallback. Error was:", error.message || error);
    
    return res.json({
      news: [
        {
          id: "fallback-bd-1",
          title: "Shocking Midnight Murder in Dhaka Streets Leaves City in Panic",
          description: "A gruesome incident was captured on CCTV in Gulshan, sparking outrage across the nation as police search for the culprits.",
          category: "crime",
          source: "Jamuna TV",
          isLive: true,
          timeAgo: "5m ago",
          viralityScore: 98
        },
        {
          id: "fallback-bd-2",
          title: "Awami League & BNP Supporters Clash During Massive Rally",
          description: "Violent clashes erupted in Paltan today, leaving dozens injured. Authorities have deployed additional forces to control the situation.",
          category: "politics",
          source: "Somoy TV",
          isLive: true,
          timeAgo: "15m ago",
          viralityScore: 95
        },
        {
          id: "fallback-bd-3",
          title: "Shakib Al Hasan Makes Shocking Retirement Statement",
          description: "The BCB is in turmoil after Shakib's sudden emotional press conference regarding his future in the national team.",
          category: "sports",
          source: "Prothom Alo",
          isLive: false,
          timeAgo: "1h ago",
          viralityScore: 92
        },
        {
          id: "fallback-bd-4",
          title: "Tragic Bus Accident in Chittagong: 12 Dead",
          description: "Heartbreaking scenes on the Dhaka-Chittagong highway as a passenger bus collides with a truck. Rescue operations are underway.",
          category: "news",
          source: "Channel 24",
          isLive: true,
          timeAgo: "2h ago",
          viralityScore: 90
        }
      ]
    });
`;

code = code.replace(oldFallback, newFallback);
fs.writeFileSync('server.ts', code);
console.log("Patched fallback data in server.ts");
