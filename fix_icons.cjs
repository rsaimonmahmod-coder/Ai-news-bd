const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

code = code.replace(/<i className="fas fa-arrow-right"[^>]*><\/i>/g, '<span style={{ color: \'#e50914\', fontSize: \'28px\', marginTop: \'5px\' }}>→</span>');
code = code.replace(/<i className="fas fa-hashtag"[^>]*><\/i>/g, '<span style={{ color: \'#e50914\' }}>#</span>');

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Icons fixed");
