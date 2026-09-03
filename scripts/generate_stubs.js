const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Generates a white PPM with a black border.
 * PPM (P6) is simple: "P6\nWIDTH HEIGHT\n255\n" followed by RGB bytes.
 */
function createWhitePpmWithBorder(filePath, width, height) {
    const header = `P6\n${width} ${height}\n255\n`;
    const headerBuf = Buffer.from(header);
    const pixelBuf = Buffer.alloc(width * height * 3, 255); // Default to white

    // Draw black border
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                const offset = (y * width + x) * 3;
                pixelBuf[offset] = 0;     // R
                pixelBuf[offset + 1] = 0; // G
                pixelBuf[offset + 2] = 0; // B
            }
        }
    }
    fs.writeFileSync(filePath, Buffer.concat([headerBuf, pixelBuf]));
}

const manifestPath = path.join(__dirname, '..', 'articles', 'index.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const THUMB_DIR = path.join(__dirname, '..', 'images', 'articles', 'thumbnails');
const FULL_DIR = path.join(__dirname, '..', 'images', 'articles', 'fullsize');

if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR, { recursive: true });
if (!fs.existsSync(FULL_DIR)) fs.mkdirSync(FULL_DIR, { recursive: true });

manifest.forEach(post => {
    const name = post.file.replace('.md', '');
    
    // Fullsize: height 420, landscape (2:1 ratio -> 840x420)
    const fullPath = path.join(FULL_DIR, `${name}.webp`);
    const fullPpm = path.join(FULL_DIR, `${name}.ppm`);
    createWhitePpmWithBorder(fullPpm, 840, 420);
    try {
        execSync(`cwebp "${fullPpm}" -o "${fullPath}"`, { stdio: 'ignore' });
        console.log(`Generated fullsize: ${fullPath}`);
    } catch (e) {
        console.error(`Failed to convert ${fullPpm} to webp: ${e.message}`);
    }
    if (fs.existsSync(fullPpm)) fs.unlinkSync(fullPpm);

    // Thumbnail: proportional (e.g., 200x100)
    const thumbPath = path.join(THUMB_DIR, `${name}.webp`);
    const thumbPpm = path.join(THUMB_DIR, `${name}.ppm`);
    createWhitePpmWithBorder(thumbPpm, 300, 150);
    try {
        execSync(`cwebp "${thumbPpm}" -o "${thumbPath}"`, { stdio: 'ignore' });
        console.log(`Generated thumbnail: ${thumbPath}`);
    } catch (e) {
        console.error(`Failed to convert ${thumbPpm} to webp: ${e.message}`);
    }
    if (fs.existsSync(thumbPpm)) fs.unlinkSync(thumbPpm);
});

console.log('Stub generation complete.');
