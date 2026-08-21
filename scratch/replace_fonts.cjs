const fs = require('fs');
const path = require('path');

const cssPath = path.join((Resolve-Path "..").Path, 'src', 'Components', 'Book', 'Book.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace font-family across the board
css = css.replace(/font-family:\s*[^;]+;/g, 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;');
css = css.replace(/font-weight:\s*(?:600|700|400|bold|normal);/g, 'font-weight: 300;');

// Update .landing-overlay padding
const overlayRegex = /\.landing-overlay\s*\{[^}]*padding:\s*15px\s+45px;[^}]*\}/;
const overlayMatch = css.match(overlayRegex);
if (overlayMatch) {
  const newOverlay = overlayMatch[0].replace('padding: 15px 45px;', 'padding: 15px 45px 15px 100px;');
  css = css.replace(overlayRegex, newOverlay);
}

// Add the fix for layout shift before react-pageflip initializes
if (!css.includes('html-book:not(.stpageflip)')) {
  css += `
/* Prevent layout shift before react-pageflip initializes */
.html-book:not(.stpageflip) {
  position: relative;
}

.html-book:not(.stpageflip) > * {
  position: absolute !important;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
}

.html-book:not(.stpageflip) > *:first-child {
  opacity: 1;
  position: relative !important; 
}
`;
}

fs.writeFileSync(cssPath, css);
console.log('Book.css updated successfully.');
