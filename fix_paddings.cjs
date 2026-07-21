const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

// youth-orange
code = code.replace(/<div style=\{\{ padding: '80px', flex: 1/g, '<div style={{ padding: \'80px 80px 140px 80px\', flex: 1');

// torn-vintage
code = code.replace(/<div style=\{\{ padding: '180px 80px', flex: 1/g, '<div style={{ padding: \'180px 80px 220px 80px\', flex: 1');

// punk themes
code = code.replace(/padding: '80px', fontFamily: '"Inter", sans-serif'/g, 'padding: \'80px 80px 140px 80px\', fontFamily: \'"Inter", sans-serif\'');

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Paddings fixed");
