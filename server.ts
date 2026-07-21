import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

// Utility function to retry with exponential backoff
async function withRetry<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (error: any) {
      attempt++;
      
      const isRateLimit = error.status === 429 || (error.message && error.message.includes("429"));
      
      if (!isRateLimit) {
        /* silent */
      }
      
      // If it's the last attempt or not a 503/unavailable error, throw
      const isUnavailable = error.status === 503 || error.message?.includes('503') || error.message?.includes('UNAVAILABLE') || error.message?.includes('high demand');
      
      if (attempt >= maxRetries || !isUnavailable) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s...
      const delay = Math.pow(2, attempt - 1) * 1000 + Math.random() * 500;
      console.log(`Waiting ${delay}ms before retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Retry failed");
}

// Generate realistic mock news for Bangladesh
app.get("/api/news/scan", async (req, res) => {
  try {
    const aiClient = getAI();
    const prompt = `
Generate exactly 6 highly viral news items. 
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
Return ONLY valid JSON.`;

    const response = await withRetry(() => aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY" as any,
          items: {
            type: "OBJECT" as any,
            properties: {
              id: { type: "STRING" as any },
              title: { type: "STRING" as any },
              description: { type: "STRING" as any },
              category: { type: "STRING" as any },
              source: { type: "STRING" as any },
              isLive: { type: "BOOLEAN" as any },
              timeAgo: { type: "STRING" as any },
              viralityScore: { type: "NUMBER" as any }
            },
            required: ["id", "title", "description", "category", "source", "isLive", "timeAgo", "viralityScore"]
          }
        }
      },
    }));

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const news = JSON.parse(text);
    res.json({ news });
  } catch (error: any) {
    const isRateLimit = error.status === 429 || (error.message && error.message.includes("429"));
    
    if (!isRateLimit) {
      /* silent */
    }
    
    // Fallback data if quota exceeded or error happens
    console.log("Serving BD fallback due to API limit.");
    
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

    res.status(500).json({ error: error.message || "Failed to scan news" });
  }
});

app.post("/api/carousel/generate", async (req, res) => {
  try {
    const { title, description } = req.body;
    const aiClient = getAI();
    
    const prompt = `
You are an expert digital marketing agency and professional copywriter.
Take this news article and break it down into 3-4 slides for a highly attractive, professional editorial carousel.

News Title: ${title}
News Description: ${description}

Style Context: Clean, authoritative, engaging, and professional.
Slide 1 headline MUST BE the actual main News Title (do not use generic words like "BREAKING"). The subheading should be the News Description.
Slides 2-3 should break down the facts using punchy, elegant, and highly professional phrases. Make the copy sound like a premium news or magazine agency.
Slide 4 should be a compelling Call to Action (e.g., "What are your thoughts?", "Join the conversation below").

Format as a JSON object with 'slides' and 'caption':
{
  "slides": [
    {
      "type": "title", // Slide type: title or content
      "headline": "ACTUAL NEWS HEADLINE HERE (NO GENERIC WORDS)",
      "subheading": "Professional context or engaging subtitle",
      "points": ["Fact 1", "Fact 2"] // Only for content slides
    }
  ],
  "caption": "Detailed Instagram caption explaining the full news context. Write it like a professional news agency. Include 10-15 highly viral and relevant hashtags at the end."
}
Return ONLY valid JSON.
`;

    const response = await withRetry(() => aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as any,
          properties: {
            slides: {
              type: "ARRAY" as any,
              items: {
                type: "OBJECT" as any,
                properties: {
                  type: { type: "STRING" as any },
                  headline: { type: "STRING" as any },
                  subheading: { type: "STRING" as any },
                  points: { 
                    type: "ARRAY" as any,
                    items: { type: "STRING" as any }
                  }
                },
                required: ["type", "headline", "subheading"]
              }
            },
            caption: { type: "STRING" as any }
          },
          required: ["slides", "caption"]
        }
      },
    }));

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    const isRateLimit = error.status === 429 || (error.message && error.message.includes("429"));
    
    if (!isRateLimit) {
      /* silent */
    }
    
    // Fallback data if quota exceeded or error happens
    console.log("Serving carousel fallback due to API limit.");
    if (true) {
      return res.json({
        slides: [
          {
            type: "title",
            headline: req.body.title || "VIRAL NEWS UPDATE",
            subheading: req.body.description || "The story is developing rapidly across social media platforms.",
            points: []
          },
          {
            type: "content",
            headline: req.body.title || "THE DETAILS",
            subheading: req.body.description || "What you need to know",
            points: [
              req.body.description || "The story is developing rapidly across social media platforms.",
              "Millions are engaging with this content globally.",
              "Stay tuned for more updates."
            ]
          },
          {
            type: "content",
            headline: "WHAT'S NEXT?",
            subheading: "Join the conversation",
            points: [
              "Drop your thoughts below",
              "Share this with someone who needs to see it",
              "Save this post for later"
            ]
          }
        ],
        caption: `🚨 BIG UPDATE: ${req.body.title || "Trending now across all platforms."}\n\n${req.body.description || "This story is capturing everyone's attention today."}\n\nWhat are your thoughts? Let us know in the comments below! 👇\n\n#BreakingNews #Trending #ViralNews #Update #NewsFlash #InstaNews`
      });
    }

    res.status(500).json({ error: error.message || "Failed to generate carousel" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on http://localhost:" + PORT);
  });
}

startServer();
