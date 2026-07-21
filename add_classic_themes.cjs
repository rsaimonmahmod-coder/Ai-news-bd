const fs = require('fs');

let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

// Add buttons
const btnReplaceStr = `
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
`;
code = code.replace(/<button \s*className=\{cn\("style-btn", theme === 'corp-red' && "active"\)\}\s*onClick=\{[^}]+\}\s*>\s*Corporate Red\s*<\/button>/, btnReplaceStr);

// Add to themeStyles
const themesReplaceStr = `
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
`;
code = code.replace(/'corp-red':\s*\{[^}]+\}/, themesReplaceStr);

// Add rendering for classic
// Find where youth-orange starts: `if (theme === 'youth-orange') {`
const classicRenderLogic = `
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
              <h1 style={{ fontSize: '65px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px', color: '#1a1a1a' }}>
                <span style={{ color: highlightColor }}>{firstHalf}</span> {secondHalf}
              </h1>
              <p style={{ fontStyle: 'italic', fontSize: '22px', color: '#444', marginTop: '10px' }}>
                @newsversebd | Source: Trending | Image: Collected
              </p>
              <p style={{ fontSize: '28px', fontWeight: 400, color: '#333', lineHeight: 1.4, marginTop: '20px' }}>
                {slide.subheading}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '50px', fontWeight: 700, lineHeight: 1.2, color: '#1a1a1a' }}>
                 <span style={{ color: highlightColor }}>{firstHalf}</span> {secondHalf}
              </h2>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '10px', borderLeft: \`6px solid \${highlightColor}\` }}>
                <p style={{ fontSize: '26px', fontWeight: 500, color: '#333', lineHeight: 1.4 }}>
                  {slide.subheading}
                </p>
              </div>
              {slide.points && slide.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  {slide.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: highlightColor, borderRadius: '50%', marginTop: '12px' }}></div>
                      <p style={{ fontSize: '26px', fontWeight: 400, color: '#222', lineHeight: 1.3 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom decorative graphic mimicking an image area */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '35%', background: \`linear-gradient(to top, \${topBarColor} 0%, rgba(0,0,0,0) 100%)\`, zIndex: 5, opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '35%', background: \`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="rgba(255,255,255,0.1)"/></svg>')\`, backgroundSize: 'cover', zIndex: 6 }}></div>
        
        <div style={{ position: 'absolute', bottom: '20px', right: '40px', zIndex: 10, display: 'flex', gap: '10px' }}>
          {Array.from({ length: total }).map((_, i) => (
             <div key={i} style={{ width: '12px', height: '12px', backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
          ))}
        </div>
      </div>
    );
  }

`;
code = code.replace(/if \(theme === 'youth-orange'\) \{/, classicRenderLogic + "\n  if (theme === 'youth-orange') {");

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Classic themes added");
