const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/const \[selectedNews, setSelectedNews\] = useState<NewsItem \| null>\(null\);\s*const \[savedNewsIds, setSavedNewsIds\] = useState<Set<string>>\(new Set\(\)\);\s*const \[activeTab, setActiveTab\] = useState\<'news' \| 'carousel' \| 'saved'\>\('news'\);/, "const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);");

fs.writeFileSync('src/App.tsx', code);
