const fs = require('fs');

const files = [
    'src/Pages/Verticals.jsx',
    'src/Pages/Pricing.jsx',
    'src/Pages/Contact.jsx',
    'src/Pages/CaseStudySingle.jsx',
    'src/Components/MaturityAudit.jsx',
    'src/Components/Initiative.jsx',
    'src/Components/Hero.jsx',
    'src/Components/ZidGenerator.jsx',
    'src/Components/SystemModal.jsx',
    'src/Components/Navbar.jsx',
    'src/Components/ROICalculator.jsx'
];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let text = fs.readFileSync(f, 'utf8');
    
    // Split by "<Button" and process each segment.
    let parts = text.split('<Button');
    for (let i = 1; i < parts.length; i++) {
        let part = parts[i];
        let processLen = Math.min(250, part.length);
        let portion = part.substring(0, processLen);
        let rest = part.substring(processLen);
        
        portion = portion.replace(/size="xs"/g, 'size="md"');
        portion = portion.replace(/px=\{4\}/g, 'px={6}');
        portion = portion.replace(/h=\{8\}/g, 'h={12}');
        
        parts[i] = portion + rest;
    }
    
    let newText = parts.join('<Button');
    if (newText !== text) {
        fs.writeFileSync(f, newText, 'utf8');
        console.log("corrected " + f);
    }
});
