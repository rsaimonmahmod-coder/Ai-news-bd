const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

// Title Slide Headline
code = code.replace(/<h1 style={{ fontSize: '65px'/g, "<h1 style={{ fontSize: '85px'");
// Title Slide Subheading
code = code.replace(/<p style={{ fontSize: '28px'/g, "<p style={{ fontSize: '36px'");
// Content Slide Headline
code = code.replace(/<h2 style={{ fontSize: '50px'/g, "<h2 style={{ fontSize: '65px'");
// Content Slide Subheading
code = code.replace(/<p style={{ fontSize: '26px'/g, "<p style={{ fontSize: '32px'");
// Content Slide points
code = code.replace(/<p style={{ fontSize: '26px', fontWeight: 400/g, "<p style={{ fontSize: '30px', fontWeight: 500");

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Patched font sizes in CarouselMaker");
