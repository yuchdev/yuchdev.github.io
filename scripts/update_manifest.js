const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'articles', 'index.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const updatedManifest = manifest.map(post => {
    const name = post.file.replace('.md', '');
    return {
        ...post,
        image: {
            thumbnail: `images/articles/thumbnails/${name}.webp`,
            fullsize: `images/articles/fullsize/${name}.webp`
        }
    };
});

fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2) + '\n');
console.log('Manifest updated successfully.');
