const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = 'articles';
const INDEX_JSON = path.join(ARTICLES_DIR, 'index.json');

/**
 * Normalizes Markdown content.
 * - Multiple \n replace to a single one.
 * - Multiple spaces replace to a single one, unless inside code example.
 * @param {string} content
 * @returns {string}
 */
function normalizeMarkdown(content) {
  const lines = content.split('\n');
  let resultLines = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Toggle code block state
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      resultLines.push(line);
      continue;
    }

    if (inCodeBlock) {
      // Inside the code block: preserve as is
      resultLines.push(line);
    } else {
      // Outside code block: normalize spaces and special characters
      // Replace multiple spaces with a single one
      let normalizedLine = line.replace(/ +/g, ' ');

      // Normalize special characters
      normalizedLine = normalizedLine
        .replace(/—/g, '-')
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"');

      resultLines.push(normalizedLine);
    }
  }

  // Join lines and replace multiple \n with a single one
  // However, Markdown usually needs one empty line between paragraphs.
  // The instruction says "Multiple \n replace to a single one".
  // This could mean \n\n -> \n, which removes empty lines.
  
  let joined = resultLines.join('\n');
  // Replace 2 or more newlines with a single newline
  joined = joined.replace(/\n{2,}/g, '\n');

  // If the file ended with a newline, preserve it (optional, but good practice)
  if (content.endsWith('\n') && !joined.endsWith('\n')) {
    joined += '\n';
  }

  return joined;
}

/**
 * Recursively find all Markdown files in a directory.
 * @param {string} dir
 * @returns {string[]}
 */
function findMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

function main() {
  // 1. Check articles root against index.json
  const indexData = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));
  const publishedFiles = new Set(indexData.map(entry => entry.file));

  const rootFiles = fs.readdirSync(ARTICLES_DIR);
  rootFiles.forEach(file => {
    if (file.endsWith('.md')) {
      if (!publishedFiles.has(file)) {
        console.warn(`WARNING: Article "${file}" exists in articles root but is not present in index.json`);
      }
    }
  });

  // 2. Normalize Markdown files
  const mdFiles = findMarkdownFiles(ARTICLES_DIR);
  mdFiles.forEach(filePath => {
    console.log(`Normalizing: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const normalized = normalizeMarkdown(content);
    fs.writeFileSync(filePath, normalized, 'utf8');
  });
}

main();
