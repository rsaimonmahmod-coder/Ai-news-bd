import React, { useState } from 'react';
import { NewsItem } from '../types';
import { cn } from '../App';

interface NewsGridProps {
  news: NewsItem[];
  isLoading: boolean;
  onCreateCarousel: (item: NewsItem) => void;
  savedNewsIds: Set<string>;
  onToggleSave: (id: string) => void;
}

const CATEGORIES = ['all', 'recent', 'viral'];

export default function NewsGrid({ news, isLoading, onCreateCarousel, savedNewsIds, onToggleSave }: NewsGridProps) {
  const [filter, setFilter] = useState('all');

  let filteredNews = [...news];
  if (filter === 'viral') {
    filteredNews.sort((a, b) => (b.viralityScore || 0) - (a.viralityScore || 0));
  } else if (filter === 'recent') {
    // Assuming API returns mixed order, 'recent' can just mean latest items first
    // Since we don't have real dates, we'll keep the original order which is usually sorted by latest from backend.
  }

  if (isLoading) {
    return (
      <div className="empty-state">
        <i className="fas fa-spinner fa-spin"></i>
        <h3>Scanning live news...</h3>
        <p>Fetching the latest viral news from Bangladesh sources.</p>
      </div>
    );
  }

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">
          <i className="fas fa-bolt" style={{ color: 'var(--primary)' }}></i> Live News Feed
        </h2>
        <div className="category-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn("category-btn", filter === cat && "active")}
              style={{ textTransform: 'capitalize' }}
            >
              {cat === 'all' ? 'All 🇧🇩' : cat === 'recent' ? 'Recent ⏱️' : 'Viral 🔥'}
            </button>
          ))}
        </div>
      </div>

      {filteredNews.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-newspaper"></i>
          <h3>No news found</h3>
          <p>Scan for latest updates or try another category.</p>
        </div>
      ) : (
        <div className="news-grid">
          {filteredNews.map((item, idx) => (
            <div key={idx} className="news-card">
              <div className="news-card-image">
                <img src={`https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80&auto=format&fit=crop&sig=${idx}`} alt={item.title} />
                <div className="news-card-badge badge-live">Live</div>
              </div>
              
              <div className="news-card-content">
                <div className="news-card-source">
                  <i className={cn(
                    "fab",
                    item.source.toLowerCase().includes('youtube') && "fa-youtube",
                    item.source.toLowerCase().includes('facebook') && "fa-facebook",
                    item.source.toLowerCase().includes('instagram') && "fa-instagram",
                    item.source.toLowerCase().includes('tiktok') && "fa-tiktok",
                    item.source.toLowerCase().includes('twitter') && "fa-twitter",
                    !['youtube', 'facebook', 'instagram', 'tiktok', 'twitter'].some(s => item.source.toLowerCase().includes(s)) && "fas fa-rss"
                  )}></i> {item.source}
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-desc">{item.description}</p>
                <div className="news-card-meta">
                  <span><i className="far fa-clock"></i> {item.timeAgo}</span>
                  <span className="viral-indicator">
                    <i className="fas fa-fire"></i> {item.viralityScore ? `Viral: ${item.viralityScore}` : 'Viral'}
                  </span>
                </div>
                
                <div className="news-card-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
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
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
