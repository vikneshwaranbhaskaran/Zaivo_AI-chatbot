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
        
        // do replacements on portion
        portion = portion.replace(/size="lg"/g, 'size="md"');
        portion = portion.replace(/size="md"/g, 'size="sm"');
        portion = portion.replace(/size="sm"/g, 'size="xs"');
        portion = portion.replace(/px=\{12\}/g, 'px={8}');
        portion = portion.replace(/px=\{10\}/g, 'px={6}');
        portion = portion.replace(/px=\{8\}/g, 'px={6}');
        portion = portion.replace(/px=\{6\}/g, 'px={4}');
        portion = portion.replace(/h=\{20\}/g, 'h={12}');
        portion = portion.replace(/h=\{16\}/g, 'h={12}');
        portion = portion.replace(/h=\{14\}/g, 'h={10}');
        portion = portion.replace(/h=\{12\}/g, 'h={10}');
        portion = portion.replace(/h=\{10\}/g, 'h={8}');
        
        parts[i] = portion + rest;
    }
    
    let newText = parts.join('<Button');
    if (newText !== text) {
        fs.writeFileSync(f, newText, 'utf8');
        console.log("updated " + f);
    }
});
