const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update state
code = code.replace(/const \[selectedNews, setSelectedNews\] = useState<NewsItem \| null>\(null\);/,
  `const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'news' | 'carousel' | 'saved'>('news');`);

// Wait, the first one has activeTab already so we should just replace activeTab line
code = code.replace(/const \[activeTab, setActiveTab\] = useState\<'news' \| 'carousel'\>\('news'\);/, 
  `const [activeTab, setActiveTab] = useState<'news' | 'carousel' | 'saved'>('news');
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());`);

// 2. Add handleToggleSave
code = code.replace(/const handleCarouselGenerated = \(\) => \{/,
  `const handleToggleSave = (id: string) => {
    setSavedNewsIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCarouselGenerated = () => {`);

// 3. Update sidebar
code = code.replace(/<div className="nav-item">\s*<i className="fas fa-fire"><\/i> Trending\s*<\/div>\s*<div className="nav-item">\s*<i className="fas fa-bookmark"><\/i> Saved Articles\s*<\/div>/,
  `<div 
                className={cn("nav-item", activeTab === 'saved' && "active")}
                onClick={() => setActiveTab('saved')}
              >
                <i className="fas fa-bookmark"></i> Saved Articles ({savedNewsIds.size})
              </div>`);

// 4. Update NewsGrid
code = code.replace(/<NewsGrid news=\{news\} isLoading=\{isScanning\} onCreateCarousel=\{handleCreateCarousel\} \/>/,
  `<NewsGrid 
                news={news} 
                isLoading={isScanning} 
                onCreateCarousel={handleCreateCarousel} 
                savedNewsIds={savedNewsIds}
                onToggleSave={handleToggleSave}
              />`);

// 5. Add Saved tab render
code = code.replace(/\{activeTab === 'carousel' && \(/,
  `{activeTab === 'saved' && (
              <NewsGrid 
                news={news.filter(n => savedNewsIds.has(n.id))} 
                isLoading={false} 
                onCreateCarousel={handleCreateCarousel} 
                savedNewsIds={savedNewsIds}
                onToggleSave={handleToggleSave}
              />
            )}
            {activeTab === 'carousel' && (`);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx");
