const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/<title>.*?<\/title>/, '<title>News Verse - Viral News & Carousel Studio</title>');
fs.writeFileSync('index.html', indexHtml);

let manifest = fs.readFileSync('public/manifest.json', 'utf8');
manifest = manifest.replace(/"name": ".*?"/, '"name": "News Verse"');
manifest = manifest.replace(/"short_name": ".*?"/, '"short_name": "News Verse"');
fs.writeFileSync('public/manifest.json', manifest);

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');
appTsx = appTsx.replace(/AI NEWSHUB <span style={{ fontSize: '1.2rem' }}>🇧🇩<\/span>/g, 'NEWS VERSE <span style={{ fontSize: \'1.2rem\' }}>🇧🇩</span>');
fs.writeFileSync('src/App.tsx', appTsx);

let carouselTsx = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');
carouselTsx = carouselTsx.replace(/YOUTH PRO/g, 'NEWS VERSE');
carouselTsx = carouselTsx.replace(/>NEWS:<\/div>/g, '>NEWS VERSE:</div>');
carouselTsx = carouselTsx.replace(/AI NewsHub BD/g, 'News Verse');
fs.writeFileSync('src/components/CarouselMaker.tsx', carouselTsx);

console.log("Names updated");
