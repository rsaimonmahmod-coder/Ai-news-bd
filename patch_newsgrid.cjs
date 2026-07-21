const fs = require('fs');
let code = fs.readFileSync('src/components/NewsGrid.tsx', 'utf8');

// Update Props
code = code.replace(/interface NewsGridProps \{[\s\S]*?\}/, `interface NewsGridProps {
  news: NewsItem[];
  isLoading: boolean;
  onCreateCarousel: (item: NewsItem) => void;
  savedNewsIds: Set<string>;
  onToggleSave: (id: string) => void;
}`);

code = code.replace(/export default function NewsGrid\(\{ news, isLoading, onCreateCarousel \}: NewsGridProps\) \{/, `export default function NewsGrid({ news, isLoading, onCreateCarousel, savedNewsIds, onToggleSave }: NewsGridProps) {`);

// Update Categories
code = code.replace(/const CATEGORIES = \['all', 'politics', 'sports', 'business', 'technology', 'entertainment', 'health'\];/, `const CATEGORIES = ['all', 'recent', 'viral'];`);

// Update Filter Logic
code = code.replace(/const filteredNews = filter === 'all' \? news : news\.filter\(item => item\.category\.toLowerCase\(\) === filter\);/, `let filteredNews = [...news];
  if (filter === 'viral') {
    filteredNews.sort((a, b) => (b.viralityScore || 0) - (a.viralityScore || 0));
  } else if (filter === 'recent') {
    // Assuming API returns mixed order, 'recent' can just mean latest items first
    // Since we don't have real dates, we'll keep the original order which is usually sorted by latest from backend.
  }`);

// Update Category Buttons Display
code = code.replace(/\{cat === 'sports' \? 'Cricket' : cat === 'entertainment' \? 'Dhallywood' : cat\} \{cat === 'all' && '🇧🇩'\}/, `{cat === 'all' ? 'All 🇧🇩' : cat === 'recent' ? 'Recent ⏱️' : 'Viral 🔥'}`);

// Update Actions to include Save Button
code = code.replace(/<button \s*className="news-card-btn make-carousel"\s*onClick=\{\(\) => onCreateCarousel\(item\)\}\s*>\s*<i className="fas fa-magic"><\/i> Make Carousel\s*<\/button>/, `<button 
                    className="news-card-btn make-carousel"
                    onClick={() => onCreateCarousel(item)}
                    style={{ flex: 1 }}
                  >
                    <i className="fas fa-magic"></i> Make Carousel
                  </button>
                  <button 
                    className="news-card-btn"
                    onClick={() => onToggleSave(item.id)}
                    style={{ padding: '0.5rem 1rem', background: savedNewsIds.has(item.id) ? 'var(--secondary)' : 'var(--surface-hover)', color: savedNewsIds.has(item.id) ? '#000' : 'var(--text)' }}
                  >
                    <i className={savedNewsIds.has(item.id) ? "fas fa-bookmark" : "far fa-bookmark"}></i> {savedNewsIds.has(item.id) ? 'Saved' : 'Save'}
                  </button>`);

code = code.replace(/<div className="news-card-actions">/, `<div className="news-card-actions" style={{ display: 'flex', gap: '0.5rem' }}>`);

fs.writeFileSync('src/components/NewsGrid.tsx', code);
console.log("Patched NewsGrid.tsx");
