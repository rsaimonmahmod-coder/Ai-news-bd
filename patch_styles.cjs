const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

const regex = /if \(theme === 'youth-orange'\) \{[\s\S]*?if \(theme === 'corp-red'\) \{[\s\S]*?\n  \}/;

const newStyles = `if (theme === 'youth-orange') {
    const isAlt = index % 2 !== 0;
    const bg = isAlt ? '#f4ece1' : '#ff6a13';
    const text = isAlt ? '#000000' : '#ffffff';
    const accent = isAlt ? '#ff6a13' : '#000000';
    
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: bg, color: text, position: 'relative', overflow: 'hidden', fontFamily: '"Space Grotesk", "Inter", sans-serif', display: 'flex', flexDirection: 'column' }}>
        {/* Abstract shapes */}
        {!isAlt && <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px', backgroundColor: '#fff', borderRadius: '50%', zIndex: 0 }}></div>}
        {isAlt && <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', backgroundColor: '#ff6a13', borderRadius: '50%', zIndex: 0, opacity: 0.1 }}></div>}
        
        <div style={{ padding: '80px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
          {slide.type === 'title' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
              <h1 style={{ fontSize: '110px', fontWeight: 900, color: '#000', lineHeight: 1.1, letterSpacing: '-2px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
              <p style={{ fontSize: '45px', fontWeight: 600, lineHeight: 1.2, color: '#fff', maxWidth: '80%', display: 'inline-block' }}>
                <span style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px 20px', display: 'inline-block' }}>
                   {slide.subheading}
                </span>
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <h2 style={{ fontSize: '80px', fontWeight: 900, color: text, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-2px' }}>
                {slide.headline}
              </h2>
              <p style={{ fontSize: '40px', fontWeight: 600, color: text, lineHeight: 1.3, backgroundColor: isAlt ? '#fff' : '#000', padding: '20px', color: isAlt ? '#000' : '#fff' }}>
                {slide.subheading}
              </p>
              {slide.points && slide.points.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                  {slide.points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '35px', fontWeight: 900, color: text }}>{(i+1).toString().padStart(2, '0')}</span>
                      <p style={{ fontSize: '32px', fontWeight: 600, color: text, paddingTop: '5px' }}>{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', width: '100%', padding: '0 80px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: text, letterSpacing: '2px' }}>YOUTH PRO</div>
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
        
        <div style={{ padding: '180px 80px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
          {slide.type === 'title' ? (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#ba1c1c', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>NEWS:</div>
              <h1 style={{ fontFamily: 'cursive, "Brush Script MT", "Comic Sans MS"', fontSize: '75px', fontWeight: 600, color: '#000', marginBottom: '40px', lineHeight: 1.2, transform: 'rotate(-2deg)' }}>
                "{slide.headline}"
              </h1>
              <p style={{ fontSize: '32px', fontWeight: 500, color: '#333', maxWidth: '90%' }}>
                {slide.subheading}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <h2 style={{ fontSize: '45px', fontWeight: 800, color: '#ba1c1c', marginBottom: '10px', textTransform: 'uppercase' }}>
                Context:
              </h2>
              <p style={{ fontFamily: 'cursive, "Brush Script MT", "Comic Sans MS"', fontSize: '55px', fontWeight: 600, color: '#000', marginBottom: '20px', lineHeight: 1.2 }}>
                "{slide.headline}"
              </p>
              
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '5px 5px 15px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '32px', fontWeight: 500, color: '#333', lineHeight: 1.5, marginBottom: slide.points?.length ? '30px' : '0' }}>
                  {slide.subheading}
                </p>
                {slide.points && slide.points.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {slide.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                         <div style={{ width: '15px', height: '15px', backgroundColor: '#ba1c1c', borderRadius: '50%', transform: 'rotate(45deg)', marginTop: '10px' }}></div>
                        <p style={{ fontSize: '28px', fontWeight: 600, color: '#555', lineHeight: 1.3 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'absolute', bottom: '40px', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'center', gap: '15px' }}>
          {Array.from({ length: total }).map((_, i) => (
             <div key={i} style={{ width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', opacity: i === index ? 1 : 0.3 }} />
          ))}
        </div>
      </div>
    );
  }

  if (theme === 'corp-red') {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#050000', color: '#fff', position: 'relative', overflow: 'hidden', fontFamily: '"Inter", sans-serif', padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Grid background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(255, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '60px 60px', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {slide.type === 'title' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '60px', fontWeight: 800, color: '#fff', backgroundColor: '#050000', border: '4px solid #fff', padding: '10px 20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <span style={{ backgroundColor: '#e50914', color: '#fff', padding: '5px 15px', borderRadius: '10px' }}>in</span>
                UPDATE
              </div>
              <h1 style={{ fontSize: '90px', fontWeight: 800, color: '#e50914', lineHeight: 1.1, marginBottom: '20px' }}>
                {slide.headline.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i % 3 === 2 ? <span style={{ backgroundColor: '#fff', color: '#e50914', padding: '0 15px', display: 'inline-block' }}>{word}</span> : word}{' '}
                  </React.Fragment>
                ))}
              </h1>
              <div style={{ border: '2px solid #e50914', borderRadius: '40px', padding: '20px 40px', marginTop: '30px', display: 'inline-block' }}>
                <p style={{ fontSize: '35px', fontWeight: 600, color: '#fff' }}>
                  {slide.subheading}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', marginBottom: '40px' }}>
                <span style={{ fontSize: '80px', fontWeight: 900, color: '#e50914', lineHeight: 1 }}>{index}.</span>
                <h2 style={{ fontSize: '65px', fontWeight: 800, lineHeight: 1.1, color: '#fff' }}>{slide.headline}</h2>
              </div>
              <div style={{ borderLeft: '4px solid #e50914', paddingLeft: '40px', marginLeft: '40px' }}>
                <p style={{ fontSize: '38px', fontWeight: 500, color: '#ccc', marginBottom: slide.points?.length ? '40px' : '0', lineHeight: 1.4 }}>
                  {slide.subheading}
                </p>
                {slide.points && slide.points.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {slide.points.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', backgroundColor: '#1a0000', padding: '20px', border: '1px solid #330000', borderRadius: '10px' }}>
                        <i className="fas fa-arrow-right" style={{ color: '#e50914', fontSize: '28px', marginTop: '5px' }}></i>
                        <p style={{ fontSize: '32px', fontWeight: 500, color: '#fff' }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
           <div style={{ fontSize: '40px', fontWeight: 800, color: '#333' }}>
             <i className="fas fa-hashtag" style={{ color: '#e50914' }}></i>
           </div>
           <div style={{ display: 'flex', gap: '15px' }}>
             {Array.from({ length: total }).map((_, i) => (
               <div key={i} style={{ width: i === index ? '40px' : '15px', height: '15px', backgroundColor: i === index ? '#e50914' : '#333', transition: 'all 0.3s' }} />
             ))}
           </div>
        </div>
      </div>
    );
  }`;

if (regex.test(code)) {
  code = code.replace(regex, newStyles);
  fs.writeFileSync('src/components/CarouselMaker.tsx', code);
  console.log("Patched successfully");
} else {
  console.log("Regex didn't match!");
}
