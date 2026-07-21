const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

code = code.replace(/<p style={{ fontSize: '40px', fontWeight: 600, color: text, lineHeight: 1\.3, backgroundColor: isAlt \? '#fff' : '#000', padding: '20px', color: isAlt \? '#000' : '#fff' }}>/g, '<p style={{ fontSize: \'40px\', fontWeight: 600, lineHeight: 1.3, backgroundColor: isAlt ? \'#fff\' : \'#000\', padding: \'20px\', color: isAlt ? \'#000\' : \'#fff\' }}>');

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Fixed duplicate color");
