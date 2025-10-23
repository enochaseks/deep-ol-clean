#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple HTML minification function
function minifyHTML(html) {
    return html
        .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
        .replace(/>\s+</g, '><')  // Remove spaces between tags
        .replace(/\s+>/g, '>')  // Remove spaces before closing tags
        .replace(/<\s+/g, '<')  // Remove spaces after opening tags
        .trim();
}

// Function to minify CSS
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
        .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}')  // Remove semicolon before closing brace
        .replace(/\s*{\s*/g, '{')  // Remove spaces around opening brace
        .replace(/\s*}\s*/g, '}')  // Remove spaces around closing brace
        .replace(/\s*;\s*/g, ';')  // Remove spaces around semicolons
        .trim();
}

// Process files in public directory
const publicDir = path.join(__dirname, 'public');

if (fs.existsSync(publicDir)) {
    // Minify HTML files
    const htmlFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));
    htmlFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const minified = minifyHTML(content);
        fs.writeFileSync(filePath, minified);
        console.log(`✓ Minified ${file}`);
    });

    // Minify CSS files
    const cssFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.css'));
    cssFiles.forEach(file => {
        const filePath = path.join(publicDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const minified = minifyCSS(content);
        fs.writeFileSync(filePath, minified);
        console.log(`✓ Minified ${file}`);
    });

    console.log('\n🎉 Build optimization complete!');
} else {
    console.log('❌ Public directory not found');
}