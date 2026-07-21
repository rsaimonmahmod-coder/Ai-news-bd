const fs = require('fs');

// 1. Fix CSS for mobile layout
let css = fs.readFileSync('src/index.css', 'utf8');

css += `
/* FORCE MOBILE OPTIMIZATION */
@media (max-width: 768px) {
  .carousel-section {
    padding: 1rem !important;
    border-radius: 16px !important;
  }
  .carousel-slides-container {
    padding: 1rem 0 !important;
  }
  .control-group {
    padding: 1rem !important;
  }
  .carousel-header {
    margin-bottom: 1rem !important;
  }
  .style-selector {
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 10px !important;
  }
  .style-btn {
    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }
  
  .news-card {
    padding: 1.5rem !important;
  }
  .container {
    padding: 0.5rem !important;
    overflow-x: hidden !important;
  }
  .dashboard {
    gap: 1rem !important;
  }
}
`;
fs.writeFileSync('src/index.css', css);

// 2. Fix CarouselMaker.tsx font sizes and padding
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

// youth-orange title
code = code.replace(/fontSize: '85px'/g, "fontSize: '70px'");
code = code.replace(/fontSize: '36px'/g, "fontSize: '28px'");
// youth-orange body
code = code.replace(/fontSize: '65px'/g, "fontSize: '50px'"); // wait, we replaced 80px with 65px before, so let's just match 65px
code = code.replace(/fontSize: '32px'/g, "fontSize: '24px'");

// torn-vintage title
code = code.replace(/fontSize: '65px'/g, "fontSize: '55px'");
code = code.replace(/fontSize: '28px'/g, "fontSize: '24px'");
// torn-vintage body
code = code.replace(/fontSize: '45px'/g, "fontSize: '35px'");

// corp-red title
code = code.replace(/fontSize: '45px', fontWeight: 800/g, "fontSize: '35px', fontWeight: 800");
code = code.replace(/fontSize: '75px'/g, "fontSize: '60px'");
code = code.replace(/fontSize: '30px'/g, "fontSize: '24px'");
// corp-red body
code = code.replace(/fontSize: '55px'/g, "fontSize: '45px'");

// Fix youth-orange bottom padding further
code = code.replace(/padding: '60px 60px 140px 60px'/g, "padding: '50px 50px 160px 50px'");
// Fix corp-red padding
code = code.replace(/padding: '80px'/g, "padding: '50px'");
// Fix punk themes padding
code = code.replace(/padding: '80px 80px 140px 80px'/g, "padding: '50px 50px 160px 50px'");

// Make sure the bottom text has enough room by limiting the line clamp in the preview or making sure it fits.
// Actually, we can use line-clamp on the subheading in the generated graphics too!
code = code.replace(/<p style=\{\{ fontSize: '24px', fontWeight: 600, lineHeight: 1\.3, backgroundColor: isAlt \? '#fff' : '#000', padding: '20px', color: isAlt \? '#000' : '#fff' \}\}>/g, 
  "<p style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.3, backgroundColor: isAlt ? '#fff' : '#000', padding: '20px', color: isAlt ? '#000' : '#fff', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>");

code = code.replace(/<p style=\{\{ fontSize: '28px', fontWeight: 600, lineHeight: 1\.2, color: '#fff', maxWidth: '80%', display: 'inline-block' \}\}>/g,
  "<p style={{ fontSize: '28px', fontWeight: 600, lineHeight: 1.2, color: '#fff', maxWidth: '80%', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>");

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Patched layout and fonts");
