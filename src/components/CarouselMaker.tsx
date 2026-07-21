import React, { useState, useRef, useEffect } from 'react';
import { NewsItem, CarouselSlide, CarouselTheme } from '../types';
import { cn } from '../App';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface CarouselMakerProps {
  initialNews: NewsItem | null;
  onGenerated: () => void;
}

export default function CarouselMaker({ initialNews, onGenerated }: CarouselMakerProps) {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [caption, setCaption] = useState<string>('');
  const [theme, setTheme] = useState<CarouselTheme>('punk-original');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (initialNews && slides.length === 0 && !isGenerating) {
      generateCarousel(initialNews);
    }
  }, [initialNews]);

  useEffect(() => {
    if (!previewContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setPreviewScale(entry.contentRect.width / 1080);
      }
    });
    observer.observe(previewContainerRef.current);
    return () => observer.disconnect();
  }, [slides.length]);

  const generateCarousel = async (news: NewsItem) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/carousel/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: news.title, description: news.description })
      });
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned non-JSON response. Please try again. (${res.status})`);
      }
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate slides');
      }
      
      const data = await res.json();
      setSlides(data.slides);
      setCaption(data.caption);
      setCurrentSlideIndex(0);
      onGenerated();
    } catch (err: any) {
      console.error(err);
      alert('Error generating carousel content: ' + (err.message || 'Unknown error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!slidesContainerRef.current || slides.length === 0) return;
    setIsDownloading(true);
    
    try {
      const zip = new JSZip();
      
      const slideNodes = slidesContainerRef.current.querySelectorAll('.export-slide');
      
      for (let i = 0; i < slideNodes.length; i++) {
        const node = slideNodes[i] as HTMLElement;
        const blob = await htmlToImage.toBlob(node, {
          pixelRatio: 2,
          backgroundColor: theme === 'punk-neon' ? '#0a0a0a' : theme === 'punk-original' ? '#F4F1EA' : '#FFFFFF',
        });
        
        if (blob) {
          zip.file("slide-" + (i + 1) + ".png", blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, "viral-carousel-" + Date.now() + ".zip");
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download carousel.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!initialNews) {
    return (
      <div className="empty-state">
        <i className="fas fa-images"></i>
        <h3>No News Selected</h3>
        <p>Go to the Live News Feed and select a story to generate a carousel.</p>
      </div>
    );
  }

  return (
    <div className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">
          <i className="fas fa-images" style={{ color: 'var(--secondary)' }}></i> Carousel Maker
        </h2>
        
        <div className="style-selector" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.5rem', alignSelf: 'center' }}>STYLE:</span>
          <button 
            className={cn("style-btn", theme === 'punk-original' && "active")}
            onClick={() => setTheme('punk-original')}
          >
            Original
          </button>
          <button 
            className={cn("style-btn", theme === 'punk-bw' && "active")}
            onClick={() => setTheme('punk-bw')}
          >
            Noir
          </button>
          <button 
            className={cn("style-btn", theme === 'punk-neon' && "active")}
            onClick={() => setTheme('punk-neon')}
          >
            Toxic
          </button>
          <button 
            className={cn("style-btn", theme === 'punk-cyber' && "active")}
            onClick={() => setTheme('punk-cyber')}
          >
            Cyber
          </button>
          <button 
            className={cn("style-btn", theme === 'punk-crimson' && "active")}
            onClick={() => setTheme('punk-crimson')}
          >
            Crimson
          </button>
          <button 
            className={cn("style-btn", theme === 'punk-gold' && "active")}
            onClick={() => setTheme('punk-gold')}
          >
            Gold
          </button>
          <button 
            className={cn("style-btn", theme === 'punk-royal' && "active")}
            onClick={() => setTheme('punk-royal')}
          >
            Royal
          </button>
          <button 
            className={cn("style-btn", theme === 'youth-orange' && "active")}
            onClick={() => setTheme('youth-orange')}
          >
            Youth Orange
          </button>
          <button 
            className={cn("style-btn", theme === 'torn-vintage' && "active")}
            onClick={() => setTheme('torn-vintage')}
          >
            Torn Vintage
          </button>
          
          <button 
            className={cn("style-btn", theme === 'corp-red' && "active")}
            onClick={() => setTheme('corp-red')}
          >
            Corporate Red
          </button>
          <button 
            className={cn("style-btn", theme === 'classic-red' && "active")}
            onClick={() => setTheme('classic-red')}
          >
            Classic Red
          </button>
          <button 
            className={cn("style-btn", theme === 'classic-blue' && "active")}
            onClick={() => setTheme('classic-blue')}
          >
            Classic Blue
          </button>
          <button 
            className={cn("style-btn", theme === 'classic-dark' && "active")}
            onClick={() => setTheme('classic-dark')}
          >
            Classic Dark
          </button>

        </div>
      </div>

      <div className="carousel-preview">
        {/* Main Preview Area */}
        <div className="carousel-slides-container">
          {isGenerating ? (
            <div className="loading-overlay active" style={{ background: 'transparent' }}>
              <div className="loading-spinner"></div>
              <p style={{ fontWeight: 700, letterSpacing: '2px', color: 'var(--primary)' }}>GENERATING GRAPHICS...</p>
            </div>
          ) : slides.length > 0 ? (
            <>
              <div 
                ref={previewContainerRef}
                className="relative shrink-0 shadow-2xl transition-all duration-300 transform" 
                style={{ width: '100%', maxWidth: 400, aspectRatio: '1/1', margin: '0 auto', flexShrink: 0, overflow: 'hidden', borderRadius: '16px' }}
              >
                <div style={{ width: 1080, height: 1080, transformOrigin: 'top left', transform: `scale(${previewScale})` }}>
                  <SlideRenderer slide={slides[currentSlideIndex]} theme={theme} index={currentSlideIndex} total={slides.length} />
                </div>
              </div>
              
              <div className="slide-nav">
                <button 
                  className="slide-nav-btn"
                  onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                  disabled={currentSlideIndex === 0}
                  style={{ opacity: currentSlideIndex === 0 ? 0.3 : 1 }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <div className="slide-dots">
                  {slides.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={cn("slide-dot", currentSlideIndex === idx && "active")}
                      onClick={() => setCurrentSlideIndex(idx)}
                    ></div>
                  ))}
                </div>
                
                <button 
                  className="slide-nav-btn"
                  onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  style={{ opacity: currentSlideIndex === slides.length - 1 ? 0.3 : 1 }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </>
          ) : null}
        </div>

        {/* Sidebar Controls */}
        <div className="carousel-controls">
          <div className="control-group">
            <span className="control-label">Source News</span>
            <div style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>{initialNews.title}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{initialNews.description}</div>
          </div>
          
          <button 
            className="generate-btn"
            onClick={() => generateCarousel(initialNews)}
            disabled={isGenerating}
          >
            {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
            Regenerate Content
          </button>
          
          <button 
            className="download-all-btn"
            onClick={handleDownload}
            disabled={isDownloading || slides.length === 0}
          >
            {isDownloading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-download"></i>}
            {isDownloading ? 'Zipping...' : 'Download Carousel'}
          </button>
          <p style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>Downloads a ZIP of high-res 1080x1080 squares perfectly formatted for Instagram.</p>

          {caption && (
            <div className="control-group" style={{ marginTop: '1.5rem' }}>
              <span className="control-label">Generated Caption</span>
              <div style={{
                color: 'var(--text)',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                whiteSpace: 'pre-wrap',
                maxHeight: '300px',
                overflowY: 'auto',
                lineHeight: '1.5'
              }}>
                {caption}
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem', marginTop: '0.75rem' }}
                onClick={() => navigator.clipboard.writeText(caption)}
              >
                <i className="fas fa-copy"></i> Copy Caption
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden container for rendering full-size slides for html2canvas */}
      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none" ref={slidesContainerRef} style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -50, opacity: 0, pointerEvents: 'none' }}>
        {slides.map((slide, idx) => (
          <div key={idx} className="export-slide" style={{ width: 1080, height: 1080 }}>
             <SlideRenderer slide={slide} theme={theme} index={idx} total={slides.length} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component for rendering the actual slide graphics based on the Punk Editorial style
interface SlideRendererProps {
  slide: CarouselSlide;
  theme: CarouselTheme;
  index: number;
  total: number;
}

function SlideRenderer({ slide, theme, index, total }: SlideRendererProps) {
  // Theme configuration
  const themeStyles = {
    'punk-original': {
      bg: '#F4F1EA',
      text: '#000000',
      accent: '#FF5500',
      border: '#000000',
      halftone: 'radial-gradient(circle, #FF5500 1px, transparent 1.5px)',
    },
    'punk-bw': {
      bg: '#FFFFFF',
      text: '#000000',
      accent: '#666666',
      border: '#000000',
      halftone: 'radial-gradient(circle, #000000 1px, transparent 1.5px)',
    },
    'punk-neon': {
      bg: '#0a0a0a',
      text: '#FFFFFF',
      accent: '#39ff14',
      border: '#39ff14',
      halftone: 'radial-gradient(circle, #39ff14 1px, transparent 1.5px)',
    },
    'punk-cyber': {
      bg: '#0f0f1a',
      text: '#00ffff',
      accent: '#ff00ff',
      border: '#00ffff',
      halftone: 'radial-gradient(circle, #ff00ff 1px, transparent 1.5px)',
    },
    'punk-crimson': {
      bg: '#1a0505',
      text: '#f8f8f8',
      accent: '#e60000',
      border: '#e60000',
      halftone: 'radial-gradient(circle, #e60000 1px, transparent 1.5px)',
    },
    'punk-gold': {
      bg: '#1a1a1a',
      text: '#ffffff',
      accent: '#ffd700',
      border: '#ffd700',
      halftone: 'radial-gradient(circle, #ffd700 1px, transparent 1.5px)',
    },
    'punk-royal': {
      bg: '#05051a',
      text: '#ffffff',
      accent: '#4d4dff',
      border: '#4d4dff',
      halftone: 'radial-gradient(circle, #4d4dff 1px, transparent 1.5px)',
    },
    'youth-orange': {
      bg: '#ff5e1a',
      text: '#ffffff',
      accent: '#000000',
      border: '#ffffff',
      halftone: 'none',
    },
    'torn-vintage': {
      bg: '#c92a2a',
      text: '#1a1a1a',
      accent: '#ffffff',
      border: '#c92a2a',
      halftone: 'none',
    },
    
    'corp-red': {
      bg: '#120000',
      text: '#ffffff',
      accent: '#ff0000',
      border: '#ff0000',
      halftone: 'radial-gradient(circle, #ff0000 1px, transparent 2px)',
    },
    'classic-red': {
      bg: '#e8e8e8',
      text: '#1a1a1a',
      accent: '#7a0000',
      border: '#ffffff',
      halftone: 'none',
    },
    'classic-blue': {
      bg: '#e8e8e8',
      text: '#1a1a1a',
      accent: '#00267a',
      border: '#ffffff',
      halftone: 'none',
    },
    'classic-dark': {
      bg: '#e8e8e8',
      text: '#1a1a1a',
      accent: '#1a1a1a',
      border: '#ffffff',
      halftone: 'none',
    }

  };

  
  const t = themeStyles[theme];

  
  if (theme.startsWith('classic')) {
    const isRed = theme === 'classic-red';
    const isBlue = theme === 'classic-blue';
    const topBarColor = isRed ? '#7a0000' : isBlue ? '#00267a' : '#1a1a1a';
    const highlightColor = isRed ? '#00267a' : isBlue ? '#7a0000' : '#1a1a1a';
    
    // Split headline for color effect
    const words = slide.headline.split(' ');
    const mid = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, mid).join(' ');
    const secondHalf = words.slice(mid).join(' ');

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: t.bg, color: t.text, position: 'relative', overflow: 'hidden', fontFamily: '"Inter", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{ backgroundColor: topBarColor, color: '#fff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <i className="fas fa-bars" style={{ fontSize: '30px' }}></i>
            <span style={{ fontFamily: '"Oswald", sans-serif', fontSize: '45px', fontWeight: 700 }}>News Verse</span>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#000', width: '50px', height: '50px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 800 }}>অ</div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#000', width: '50px', height: '50px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}><i className="fas fa-info"></i></div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#000', width: '50px', height: '50px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}><i className="fas fa-search"></i></div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '40px 50px', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
          <div style={{ fontFamily: '"Oswald", sans-serif', fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>
            {dateStr}
          </div>
          
          {slide.type === 'title' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h1 style={{ fontSize: '85px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', color: '#1a1a1a' }}>
                <span style={{ color: highlightColor }}>{firstHalf}</span> {secondHalf}
              </h1>
              <p style={{ fontStyle: 'italic', fontSize: '22px', color: '#444', marginTop: '10px' }}>
                @newsversebd | Source: Trending | Image: Collected
              </p>
              <p style={{ fontSize: '36px', fontWeight: 400, color: '#333', lineHeight: 1.4, marginTop: '20px' }}>
                {slide.subheading}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '65px', fontWeight: 700, lineHeight: 1.2, color: '#1a1a1a' }}>
                 <span style={{ color: highlightColor }}>{firstHalf}</span> {secondHalf}
              </h2>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '10px', borderLeft: `6px solid ${highlightColor}` }}>
                <p style={{ fontSize: '32px', fontWeight: 500, color: '#333', lineHeight: 1.4 }}>
                  {slide.subheading}
                </p>
              </div>
              {slide.points && slide.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  {slide.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: highlightColor, borderRadius: '50%', marginTop: '12px' }}></div>
                      <p style={{ fontSize: '32px', fontWeight: 400, color: '#222', lineHeight: 1.3 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom decorative graphic mimicking an image area */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '35%', background: `linear-gradient(to top, ${topBarColor} 0%, rgba(0,0,0,0) 100%)`, zIndex: 5, opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '35%', background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="rgba(255,255,255,0.1)"/></svg>')`, backgroundSize: 'cover', zIndex: 6 }}></div>
        
        <div style={{ position: 'absolute', bottom: '20px', right: '40px', zIndex: 10, display: 'flex', gap: '10px' }}>
          {Array.from({ length: total }).map((_, i) => (
             <div key={i} style={{ width: '12px', height: '12px', backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
          ))}
        </div>
      </div>
    );
  }


  if (theme === 'youth-orange') {
    const isAlt = index % 2 !== 0;
    const bg = isAlt ? '#f4ece1' : '#ff6a13';
    const text = isAlt ? '#000000' : '#ffffff';
    const accent = isAlt ? '#ff6a13' : '#000000';
    
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: bg, color: text, position: 'relative', overflow: 'hidden', fontFamily: '"Space Grotesk", "Inter", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Abstract shapes */}
        {!isAlt && <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px', backgroundColor: '#fff', borderRadius: '50%', zIndex: 0 }}></div>}
        {isAlt && <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', backgroundColor: '#ff6a13', borderRadius: '50%', zIndex: 0, opacity: 0.1 }}></div>}
        
        <div style={{ padding: '50px 50px 160px 50px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
          {slide.type === 'title' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
              <h1 style={{ fontSize: '70px', fontWeight: 900, color: '#000', lineHeight: 1.1, letterSpacing: '-2px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {slide.headline.split(' ').map((word, i) => (
                  <span key={i} style={{ 
                    backgroundColor: i % 2 !== 0 ? '#000' : 'transparent', 
                    color: i % 2 !== 0 ? '#fff' : '#000',
                    padding: i % 2 !== 0 ? '0 20px' : '0',
                    alignSelf: 'flex-start'
                  }}>
                    {word}
                  </span>
                ))}
              </h1>
              <p style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2, color: '#fff', maxWidth: '80%', display: 'inline-block' }}>
                <span style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px 20px', display: 'inline-block' }}>
                   {slide.subheading}
                </span>
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h2 style={{ fontSize: '45px', fontWeight: 900, color: text, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-2px' }}>
                {slide.headline}
              </h2>
              <p style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3, backgroundColor: isAlt ? '#fff' : '#000', padding: '20px', color: isAlt ? '#000' : '#fff', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {slide.subheading}
              </p>
              {slide.points && slide.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                  {slide.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '24px', fontWeight: 900, color: text }}>{(i+1).toString().padStart(2, '0')}</span>
                      <p style={{ fontSize: '24px', fontWeight: 600, color: text, paddingTop: '5px' }}>{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', bottom: '30px', width: '100%', padding: '0 60px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: text, letterSpacing: '2px' }}>NEWS VERSE</div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {Array.from({ length: total }).map((_, i) => (
               <div key={i} style={{ width: i === index ? '40px' : '12px', height: '12px', backgroundColor: i === index ? accent : text, opacity: i === index ? 1 : 0.3, borderRadius: '10px' }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (theme === 'torn-vintage') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#f4ede4', color: '#000', position: 'relative', overflow: 'hidden', fontFamily: '"Inter", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Torn paper top */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', backgroundColor: '#ba1c1c', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 85%, 90% 100%, 85% 75%, 80% 95%, 75% 80%, 70% 100%, 65% 85%, 60% 100%, 55% 75%, 50% 95%, 45% 80%, 40% 100%, 35% 85%, 30% 95%, 25% 75%, 20% 100%, 15% 85%, 10% 95%, 5% 75%, 0 100%)', zIndex: 5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}></div>
        
        {/* Torn paper bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', backgroundColor: '#ba1c1c', clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 95% 20%, 90% 0, 85% 30%, 80% 10%, 75% 20%, 70% 0, 65% 20%, 60% 0, 55% 30%, 50% 10%, 45% 20%, 40% 0, 35% 20%, 30% 10%, 25% 30%, 20% 0, 15% 20%, 10% 10%, 5% 30%, 0 0)', zIndex: 5, boxShadow: '0 -10px 20px rgba(0,0,0,0.2)' }}></div>
        
        <div style={{ padding: '180px 80px 220px 80px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
          {slide.type === 'title' ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#ba1c1c', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>NEWS VERSE:</div>
              <h1 style={{ fontFamily: 'cursive, "Brush Script MT", "Comic Sans MS"', fontSize: '45px', fontWeight: 600, color: '#000', marginBottom: '40px', lineHeight: 1.2, transform: 'rotate(-2deg)' }}>
                "{slide.headline}"
              </h1>
              <p style={{ fontSize: '24px', fontWeight: 500, color: '#333', maxWidth: '90%' }}>
                {slide.subheading}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ba1c1c', marginBottom: '10px', textTransform: 'uppercase' }}>
                Context:
              </h2>
              <p style={{ fontFamily: 'cursive, "Brush Script MT", "Comic Sans MS"', fontSize: '35px', fontWeight: 600, color: '#000', marginBottom: '20px', lineHeight: 1.2 }}>
                "{slide.headline}"
              </p>
              
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '5px 5px 15px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '24px', fontWeight: 500, color: '#333', lineHeight: 1.5, marginBottom: slide.points?.length ? '30px' : '0' }}>
                  {slide.subheading}
                </p>
                {slide.points && slide.points.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {slide.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                         <div style={{ width: '15px', height: '15px', backgroundColor: '#ba1c1c', borderRadius: '50%', transform: 'rotate(45deg)', marginTop: '10px' }}></div>
                        <p style={{ fontSize: '24px', fontWeight: 600, color: '#555', lineHeight: 1.3 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', bottom: '30px', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', gap: '15px' }}>
          {Array.from({ length: total }).map((_, i) => (
             <div key={i} style={{ width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', opacity: i === index ? 1 : 0.3 }} />
          ))}
        </div>
      </div>
    );
  }

  if (theme === 'corp-red') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#050000', color: '#fff', position: 'relative', overflow: 'hidden', fontFamily: '"Inter", sans-serif', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Grid background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '60px 60px', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {slide.type === 'title' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '35px', fontWeight: 800, color: '#fff', backgroundColor: '#050000', border: '4px solid #fff', padding: '10px 20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <span style={{ backgroundColor: '#e50914', color: '#fff', padding: '5px 15px', borderRadius: '10px' }}>in</span>
                UPDATE
              </div>
              <h1 style={{ fontSize: '60px', fontWeight: 800, color: '#e50914', lineHeight: 1.1, marginBottom: '20px' }}>
                {slide.headline.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i % 3 === 2 ? <span style={{ backgroundColor: '#fff', color: '#e50914', padding: '0 15px', display: 'inline-block' }}>{word}</span> : word}{' '}
                  </React.Fragment>
                ))}
              </h1>
              <div style={{ border: '2px solid #e50914', borderRadius: '40px', padding: '20px 40px', marginTop: '30px', display: 'inline-block' }}>
                <p style={{ fontSize: '24px', fontWeight: 600, color: '#fff' }}>
                  {slide.subheading}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', marginBottom: '40px' }}>
                <span style={{ fontSize: '45px', fontWeight: 900, color: '#e50914', lineHeight: 1 }}>{index}.</span>
                <h2 style={{ fontSize: '45px', fontWeight: 800, lineHeight: 1.1, color: '#fff' }}>{slide.headline}</h2>
              </div>
              <div style={{ borderLeft: '4px solid #e50914', paddingLeft: '40px', marginLeft: '40px' }}>
                <p style={{ fontSize: '24px', fontWeight: 500, color: '#ccc', marginBottom: slide.points?.length ? '40px' : '0', lineHeight: 1.4 }}>
                  {slide.subheading}
                </p>
                {slide.points && slide.points.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {slide.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', backgroundColor: '#1a0000', padding: '20px', border: '1px solid #330000', borderRadius: '10px' }}>
                        <span style={{ color: '#e50914', fontSize: '24px', marginTop: '5px' }}>→</span>
                        <p style={{ fontSize: '24px', fontWeight: 500, color: '#fff' }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
           <div style={{ fontSize: '24px', fontWeight: 800, color: '#333' }}>
             <span style={{ color: '#e50914' }}>#</span>
           </div>
           <div style={{ display: 'flex', gap: '15px' }}>
             {Array.from({ length: total }).map((_, i) => (
               <div key={i} style={{ width: i === index ? '40px' : '15px', height: '15px', backgroundColor: i === index ? '#e50914' : '#333', transition: 'all 0.3s' }} />
             ))}
           </div>
        </div>
      </div>
    );
  }


  return (
    <div 
      style={{
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        backgroundColor: t.bg, color: t.text, padding: '50px 50px 160px 50px', fontFamily: '"Inter", sans-serif'
      }}
    >
      {/* Background Halftone Texture - Top Right */}
      <div 
        style={{
          position: 'absolute', top: 0, right: 0, opacity: 0.2, pointerEvents: 'none',
          width: '60%', height: '60%',
          backgroundImage: t.halftone,
          backgroundSize: '24px 24px',
          borderBottomLeftRadius: '100%',
        }}
      />
      
      {/* Background Halftone Texture - Bottom Left */}
      <div 
        style={{
          position: 'absolute', bottom: 0, left: 0, opacity: 0.1, pointerEvents: 'none',
          width: '40%', height: '40%',
          backgroundImage: t.halftone,
          backgroundSize: '16px 16px',
          borderTopRightRadius: '100%',
        }}
      />

      {/* Main Content Area */}
      <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {slide.type === 'title' ? (
          <div style={{ textAlign: 'center' }}>
            {/* Scribble Circle Accent behind text */}
            <div 
              style={{
                position: 'absolute', top: '50%', left: '50%', opacity: 0.2,
                width: '120%', height: '140%',
                border: "10px solid " + t.accent,
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                transform: 'translate(-50%, -50%) rotate(-5deg)'
              }}
            />
            
            <h1 
              style={{
                fontFamily: '"Space Grotesk", Impact, sans-serif',
                fontSize: '90px',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
                color: t.text
              }}
            >
              {slide.headline.split(' ').map((word, i) => (
                <span key={i} style={{ color: i % 2 !== 0 ? t.accent : t.text, display: 'inline-block', marginRight: '0.2em' }}>
                  {word}
                </span>
              ))}
            </h1>
            
            {/* Thick brushstroke underline */}
            <div 
              style={{
                margin: '0 auto',
                width: '80%',
                height: '24px',
                backgroundColor: t.accent,
                transform: 'rotate(-1deg)',
                marginBottom: '60px'
              }}
            />
            
            <p 
              style={{
                fontSize: '42px',
                fontWeight: 600,
                lineHeight: 1.3,
                maxWidth: '90%',
                margin: '0 auto',
                backgroundColor: t.text,
                color: t.bg,
                padding: '16px 24px',
                display: 'inline-block'
              }}
            >
              {slide.subheading}
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'left', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '72px',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderLeft: "16px solid " + t.accent,
                paddingLeft: '32px',
                marginBottom: '60px',
                lineHeight: 1
              }}
            >
              {slide.headline}
            </h2>
            
            <p 
              style={{
                fontSize: '24px',
                fontWeight: 500,
                marginBottom: '40px',
                maxWidth: '90%'
              }}
            >
              {slide.subheading}
            </p>

            {slide.points && slide.points.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                {slide.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <span 
                      style={{
                        display: 'inline-block',
                        width: '32px',
                        height: '32px',
                        backgroundColor: t.accent,
                        marginTop: '8px',
                        flexShrink: 0
                      }}
                    />
                    <p style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2 }}>
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Framing (Torn paper illusion with border) */}
      <div 
        style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          borderTop: "8px solid " + t.border,
          padding: '32px 48px',
          backgroundColor: t.bg
        }}
      >
        <div 
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '24px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          News Verse
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i}
              style={{
                width: i === index ? '48px' : '16px',
                height: '8px',
                backgroundColor: i === index ? t.accent : t.border,
                opacity: i === index ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
