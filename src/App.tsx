import React, { useState } from 'react';
import NewsGrid from './components/NewsGrid';
import CarouselMaker from './components/CarouselMaker';
import { NewsItem, CarouselTheme, CarouselSlide } from './types';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'news' | 'carousel' | 'saved'>('news');
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Stats
  const [stats, setStats] = useState({ scanned: 0, carousels: 0 });

  const scanNews = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/news/scan');
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response. Please try again. (${res.status})`);
      }
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to scan news');
      }
      
      const data = await res.json();
      setNews(data.news);
      setStats(s => ({ ...s, scanned: s.scanned + data.news.length }));
    } catch (err: any) {
      console.error(err);
      alert('Error scanning news: ' + (err.message || 'Unknown error'));
    } finally {
      setIsScanning(false);
    }
  };

  const handleCreateCarousel = (item: NewsItem) => {
    setSelectedNews(item);
    setActiveTab('carousel');
  };

  const handleToggleSave = (id: string) => {
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

  const handleCarouselGenerated = () => {
    setStats(s => ({ ...s, carousels: s.carousels + 1 }));
  };

  return (
    <>
      <div className="bg-grid"></div>
      
      <header className="header">
        <div className="logo">
          <i className="fas fa-bolt" style={{ color: 'var(--primary)', marginRight: '12px' }}></i>
          NEWS VERSE <span style={{ fontSize: '1.2rem' }}>🇧🇩</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span>LIVE FEED</span>
          </div>
          <button className="btn btn-secondary" onClick={scanNews} disabled={isScanning}>
            {isScanning ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-radar"></i>}
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>
      </header>

      <div className="container">
        {news.length === 0 && !isScanning && (
          <div className="scan-section">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="scan-title">
                <i className="fas fa-satellite-dish" style={{ color: 'var(--primary)' }}></i> Bangladesh News Scanner
              </h2>
              <p className="scan-desc">
                Scans BDNews24, Daily Star, Prothom Alo, Dhaka Tribune & 80,000+ sources for fresh Bangladesh news.
              </p>
              <button className="scan-btn" onClick={scanNews}>
                <i className="fas fa-satellite"></i> <span>Scan Live News</span>
              </button>
            </div>
          </div>
        )}

        <div className="dashboard">
          <aside className="sidebar">
            <div className="sidebar-title">
              <i className="fas fa-compass"></i> Navigation
            </div>
            <nav>
              <div 
                className={cn("nav-item", activeTab === 'news' && "active")}
                onClick={() => setActiveTab('news')}
              >
                <i className="fas fa-newspaper"></i> Live News Feed
              </div>
              <div 
                className={cn("nav-item", activeTab === 'carousel' && "active")}
                onClick={() => setActiveTab('carousel')}
              >
                <i className="fas fa-images"></i> Carousel Maker
              </div>
              <div 
                className={cn("nav-item", activeTab === 'saved' && "active")}
                onClick={() => setActiveTab('saved')}
              >
                <i className="fas fa-bookmark"></i> Saved Articles ({savedNewsIds.size})
              </div>
            </nav>
            
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div className="sidebar-title">
                <i className="fas fa-chart-line"></i> Stats
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Articles</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{stats.scanned}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Carousels</span>
                  <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>{stats.carousels}</span>
                </div>
              </div>
            </div>
          </aside>
          
          <main className="main-content">
            {activeTab === 'news' && (
              <NewsGrid 
                news={news} 
                isLoading={isScanning} 
                onCreateCarousel={handleCreateCarousel} 
                savedNewsIds={savedNewsIds}
                onToggleSave={handleToggleSave}
              />
            )}
            {activeTab === 'saved' && (
              <NewsGrid 
                news={news.filter(n => savedNewsIds.has(n.id))} 
                isLoading={false} 
                onCreateCarousel={handleCreateCarousel} 
                savedNewsIds={savedNewsIds}
                onToggleSave={handleToggleSave}
              />
            )}
            {activeTab === 'carousel' && (
              <CarouselMaker initialNews={selectedNews} onGenerated={handleCarouselGenerated} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
