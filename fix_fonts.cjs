const fs = require('fs');
let code = fs.readFileSync('src/components/CarouselMaker.tsx', 'utf8');

// youth-orange
code = code.replace(/fontSize: '110px'/g, "fontSize: '85px'");
code = code.replace(/fontSize: '45px'/g, "fontSize: '36px'");
code = code.replace(/fontSize: '80px'/g, "fontSize: '65px'");
code = code.replace(/fontSize: '40px'/g, "fontSize: '32px'");

// torn-vintage
code = code.replace(/fontSize: '75px'/g, "fontSize: '65px'");
code = code.replace(/fontSize: '32px'/g, "fontSize: '28px'");
code = code.replace(/fontSize: '55px'/g, "fontSize: '45px'");

// corp-red
code = code.replace(/fontSize: '60px'/g, "fontSize: '45px'");
code = code.replace(/fontSize: '90px'/g, "fontSize: '75px'");
code = code.replace(/fontSize: '35px'/g, "fontSize: '30px'");
// wait, 80px is replaced by 65px above
code = code.replace(/fontSize: '65px'/g, "fontSize: '55px'"); // might replace the one just replaced, let's be careful
// actually let's use exact replacements for corp-red
code = code.replace(/fontSize: '38px'/g, "fontSize: '30px'");

// punk themes
code = code.replace(/fontSize: '120px'/g, "fontSize: '90px'");
code = code.replace(/fontSize: '48px'/g, "fontSize: '36px'");
code = code.replace(/fontSize: '96px'/g, "fontSize: '70px'");

// Fix youth-orange bottom padding just to be safe
code = code.replace(/padding: '80px 80px 140px 80px'/g, "padding: '60px 60px 140px 60px'");
code = code.replace(/padding: '0 80px'/g, "padding: '0 60px'");
code = code.replace(/bottom: '40px'/g, "bottom: '30px'");

fs.writeFileSync('src/components/CarouselMaker.tsx', code);
console.log("Fonts fixed");
