const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

const replacement = `
  const t = themeStyles[theme];

  if (theme === 'youth-orange') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#ff6a13', color: '#fff', position: 'relative', overflow: 'hidden', fontFamily: '"Space Grotesk", sans-serif', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* White abstract shape */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', backgroundColor: '#fff', borderRadius: '50%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', border: '20px solid #fff', borderRadius: '50%', zIndex: 0, opacity: 0.2 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          {slide.type === 'title' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h1 style={{ fontSize: '110px', fontWeight: 900, color: '#000', lineHeight: 0.9, letterSpacing: '-2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                {slide.headline}
              </h1>
              <p style={{ fontSize: '50px', fontWeight: 700, lineHeight: 1.1, display: 'inline-block' }}>
                <span style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', display: 'inline-block', marginBottom: '10px' }}>
                  {slide.subheading}
                </span>
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <h2 style={{ fontSize: '70px', fontWeight: 900, color: '#000', textTransform: 'uppercase', lineHeight: 1 }}>
                {slide.headline}
              </h2>
              <p style={{ fontSize: '40px', fontWeight: 600, color: '#fff', backgroundColor: '#000', padding: '20px' }}>
                {slide.subheading}
              </p>
              {slide.points && slide.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                  {slide.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%' }}></div>
                      <p style={{ fontSize: '32px', fontWeight: 600 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 10, display: 'flex', gap: '10px' }}>
          {Array.from({ length: total }).map((_, i) => (
             <div key={i} style={{ width: '12px', height: '12px', backgroundColor: i === index ? '#000' : 'rgba(0,0,0,0.3)', borderRadius: '50%' }} />
          ))}
        </div>
      </div>
    );
  }

  if (theme === 'torn-vintage') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', color: '#000', position: 'relative', overflow: 'hidden', fontFamily: '"Inter", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Torn paper top */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', backgroundColor: '#c92a2a', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 80%, 90% 100%, 85% 70%, 80% 90%, 75% 80%, 70% 100%, 65% 80%, 60% 100%, 55% 70%, 50% 90%, 45% 80%, 40% 100%, 35% 80%, 30% 90%, 25% 70%, 20% 100%, 15% 80%, 10% 90%, 5% 70%, 0 100%)', zIndex: 5 }}></div>
        
        {/* Torn paper bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '120px', backgroundColor: '#c92a2a', clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 95% 20%, 90% 0, 85% 30%, 80% 10%, 75% 20%, 70% 0, 65% 20%, 60% 0, 55% 30%, 50% 10%, 45% 20%, 40% 0, 35% 20%, 30% 10%, 25% 30%, 20% 0, 15% 20%, 10% 10%, 5% 30%, 0 0)', zIndex: 5 }}></div>
        
        <div style={{ padding: '160px 80px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
          {slide.type === 'title' ? (
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '90px', fontWeight: 800, color: '#c92a2a', marginBottom: '30px', fontStyle: 'italic' }}>
                {slide.headline}
              </h1>
              <p style={{ fontSize: '45px', fontWeight: 500, fontStyle: 'italic' }}>
                {slide.subheading}
              </p>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '60px', fontWeight: 800, color: '#c92a2a', marginBottom: '40px' }}>
                {slide.headline}
              </h2>
              <p style={{ fontSize: '40px', fontWeight: 500, marginBottom: '50px', fontStyle: 'italic', backgroundColor: '#f0f0f0', padding: '20px', borderLeft: '8px solid #c92a2a' }}>
                "{slide.subheading}"
              </p>
              {slide.points && slide.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {slide.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <i className="fas fa-check" style={{ color: '#c92a2a', fontSize: '30px' }}></i>
                      <p style={{ fontSize: '32px', fontWeight: 600 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {Array.from({ length: total }).map((_, i) => (
             <div key={i} style={{ width: '40px', height: '6px', backgroundColor: '#fff', opacity: i === index ? 1 : 0.4 }} />
          ))}
        </div>
      </div>
    );
  }

  if (theme === 'corp-red') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#0a0000', color: '#fff', position: 'relative', overflow: 'hidden', fontFamily: '"Inter", sans-serif', padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Grid background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {slide.type === 'title' ? (
            <div>
              <div style={{ backgroundColor: '#ff0000', color: '#fff', padding: '10px 20px', display: 'inline-block', fontSize: '30px', fontWeight: 700, marginBottom: '30px' }}>
                BREAKING UPDATE
              </div>
              <h1 style={{ fontSize: '100px', fontWeight: 900, marginBottom: '40px', lineHeight: 1 }}>
                {slide.headline}
              </h1>
              <p style={{ fontSize: '40px', fontWeight: 400, color: '#ffaaaa', borderLeft: '4px solid #ff0000', paddingLeft: '20px' }}>
                {slide.subheading}
              </p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                <span style={{ fontSize: '80px', fontWeight: 900, color: '#ff0000' }}>{index}.</span>
                <h2 style={{ fontSize: '70px', fontWeight: 800, lineHeight: 1 }}>{slide.headline}</h2>
              </div>
              <div style={{ backgroundColor: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.2)', padding: '40px', borderRadius: '20px' }}>
                <p style={{ fontSize: '36px', fontWeight: 400, color: '#ffaaaa', marginBottom: slide.points?.length ? '40px' : '0' }}>
                  {slide.subheading}
                </p>
                {slide.points && slide.points.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {slide.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <i className="fas fa-chevron-right" style={{ color: '#ff0000', fontSize: '24px' }}></i>
                        <p style={{ fontSize: '32px', fontWeight: 500 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid rgba(255,0,0,0.3)', paddingTop: '30px' }}>
           <div style={{ fontSize: '24px', fontWeight: 700, color: '#ff0000', letterSpacing: '2px' }}>AI NEWSHUB BD</div>
           <div style={{ display: 'flex', gap: '10px' }}>
             {Array.from({ length: total }).map((_, i) => (
               <div key={i} style={{ width: '10px', height: '10px', backgroundColor: i === index ? '#ff0000' : 'rgba(255,0,0,0.2)', transform: 'rotate(45deg)' }} />
             ))}
           </div>
        </div>
      </div>
    );
  }
`;

code = code.replace(/const t = themeStyles\[theme\];/, replacement);
fs.writeFileSync('src/components/CarouselMaker.tsx', code);
