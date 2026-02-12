// assets/blog.js
(() => {
    // Only run on blog.html
    if (!document.querySelector("#blog-list")) return;

    /**
     * GitHub Pages base-path safety helper
     * @param {string} path - relative path
     * @returns {string} - full URL
     */
    function baseUrl(path) {
        return new URL(path, document.baseURI).toString();
    }

    /**
     * Escapes HTML special characters
     * @param {string} text
     * @returns {string}
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Removes YAML front matter from markdown
     * @param {string} markdown
     * @returns {string}
     */
    function removeFrontMatter(markdown) {
        if (markdown.trim().startsWith('---')) {
            const lines = markdown.split('\n');
            let endIndex = -1;
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '---') {
                    endIndex = i;
                    break;
                }
            }
            if (endIndex !== -1) {
                return lines.slice(endIndex + 1).join('\n');
            }
        }
        return markdown;
    }

    /**
     * Removes fenced code blocks from markdown
     * @param {string} markdown
     * @returns {string}
     */
    function removeCodeBlocks(markdown) {
        return markdown.replace(/```[\s\S]*?```/g, '');
    }

    /**
     * Converts markdown to plain text for length measurement
     * @param {string} markdown
     * @returns {string}
     */
    function markdownToPlainText(markdown) {
        let text = markdown;
        // Remove inline code
        text = text.replace(/`([^`]+)`/g, '$1');
        // Remove emphasis markers
        text = text.replace(/[*_~]/g, '');
        // Transform links [text](url) → text
        text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        // Remove heading markers
        text = text.replace(/^#+\s+/gm, '');
        return text;
    }

    /**
     * Splits markdown into paragraphs (blank-line separated)
     * @param {string} markdown
     * @returns {string[]}
     */
    function splitIntoParagraphs(markdown) {
        return markdown
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0);
    }

    /**
     * Finds the first sentence boundary after position 300
     * @param {string} text - plain text
     * @returns {number} - position to cut, or -1 if not found
     */
    function findSentenceBoundary(text) {
        if (text.length <= 300) return text.length;

        const afterThreshold = text.substring(300);
        // Look for sentence boundaries: . ! ? … followed by space
        // Allow optional closing quote/bracket before whitespace
        const boundaryRegex = /[.!?…]["\])]?\s/;
        const match = afterThreshold.match(boundaryRegex);
        
        if (match) {
            return 300 + match.index + match[0].length - 1; // -1 to not include trailing space
        }
        return -1; // No boundary found
    }

    /**
     * Extracts preview from markdown according to the specified rules
     * @param {string} markdown
     * @returns {string[]} - array of paragraph HTML strings
     */
    function extractPreview(markdown) {
        // Remove front matter and code blocks
        let content = removeFrontMatter(markdown);
        content = removeCodeBlocks(content);

        // Split into paragraphs
        const paragraphs = splitIntoParagraphs(content);
        
        if (paragraphs.length === 0) {
            return ['<p>No content available.</p>'];
        }

        // Check if 2+ paragraphs and combined length < 300
        if (paragraphs.length >= 2) {
            const p1Plain = markdownToPlainText(paragraphs[0]);
            const p2Plain = markdownToPlainText(paragraphs[1]);
            const combined = p1Plain + "\n\n" + p2Plain;
            
            if (combined.length < 300) {
                // Return two paragraphs
                return [
                    `<p>${escapeHtml(p1Plain)}</p>`,
                    `<p>${escapeHtml(p2Plain)}</p>`
                ];
            }
        }

        // Otherwise, join all paragraphs and find sentence boundary
        const allPlainText = paragraphs.map(p => markdownToPlainText(p)).join("\n\n");
        
        if (allPlainText.length <= 300) {
            // Return full text as one paragraph
            return [`<p>${escapeHtml(allPlainText)}</p>`];
        }

        // Find sentence boundary after 300 chars
        const cutPos = findSentenceBoundary(allPlainText);
        
        let preview;
        if (cutPos !== -1) {
            preview = allPlainText.substring(0, cutPos).trim();
        } else {
            // Hard cut at 300
            preview = allPlainText.substring(0, 300).trim();
        }
        
        return [`<p>${escapeHtml(preview)}…</p>`];
    }

    /**
     * Renders a single blog card
     * @param {Object} post - post metadata
     * @param {string[]} previewHtml - array of preview paragraph HTML
     * @returns {string}
     */
    function renderBlogCard(post, previewHtml) {
        const tags = post.tags && post.tags.length > 0 
            ? `<span class="blog-tags">${post.tags.join(' • ')}</span>`
            : '';

        return `
            <article class="blog-card">
                <h3 class="blog-card__title">
                    <a href="./article.html?slug=${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a>
                </h3>
                <div class="blog-meta">
                    <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
                    ${tags}
                </div>
                <div class="blog-preview">
                    ${previewHtml.join('\n')}
                </div>
                <a class="blog-readmore" href="./article.html?slug=${escapeHtml(post.slug)}">Continue reading →</a>
            </article>
        `;
    }

    /**
     * Renders pagination UI
     * @param {number} currentPage
     * @param {number} totalPages
     * @returns {string}
     */
    function renderPagination(currentPage, totalPages) {
        if (totalPages <= 1) return '';

        let html = '';
        
        // Previous button
        if (currentPage > 1) {
            html += `<a href="./blog.html?page=${currentPage - 1}" class="pager-btn">← Prev</a>`;
        } else {
            html += `<span class="pager-btn pager-btn--disabled">← Prev</span>`;
        }

        // Page numbers with ellipsis logic: 1 … p-1 p p+1 … N
        const pages = [];
        
        if (totalPages <= 7) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage > 3) {
                pages.push('...');
            }
            
            // Show p-1, p, p+1 (if they exist and aren't 1 or totalPages)
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
            
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
            
            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        // Render page numbers
        pages.forEach(page => {
            if (page === '...') {
                html += `<span class="pager-ellipsis">…</span>`;
            } else if (page === currentPage) {
                html += `<span class="pager-num pager-num--active">${page}</span>`;
            } else {
                html += `<a href="./blog.html?page=${page}" class="pager-num">${page}</a>`;
            }
        });

        // Next button
        if (currentPage < totalPages) {
            html += `<a href="./blog.html?page=${currentPage + 1}" class="pager-btn">Next →</a>`;
        } else {
            html += `<span class="pager-btn pager-btn--disabled">Next →</span>`;
        }

        return html;
    }

    /**
     * Gets page number from URL query params
     * @returns {number}
     */
    function getCurrentPage() {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page') || '1', 10);
        return Math.max(1, page); // Clamp to minimum 1
    }

    /**
     * Main initialization function
     */
    async function init() {
        const blogList = document.getElementById('blog-list');
        const blogPager = document.getElementById('blog-pager');
        
        try {
            // Load manifest
            const manifestResponse = await fetch(baseUrl('articles/index.json'));
            if (!manifestResponse.ok) {
                throw new Error(`Failed to load manifest: ${manifestResponse.status}`);
            }
            const manifest = await manifestResponse.json();

            // Sort by date (newest first)
            manifest.sort((a, b) => b.date.localeCompare(a.date));

            // Pagination
            const currentPage = getCurrentPage();
            const pageSize = 10;
            const totalPages = Math.ceil(manifest.length / pageSize);
            
            // Clamp page to valid range
            const validPage = Math.min(currentPage, Math.max(1, totalPages));
            
            const startIdx = (validPage - 1) * pageSize;
            const endIdx = Math.min(startIdx + pageSize, manifest.length);
            const postsToShow = manifest.slice(startIdx, endIdx);

            // Fetch and render posts
            const cards = [];
            for (const post of postsToShow) {
                try {
                    const mdResponse = await fetch(baseUrl('articles/' + post.file));
                    if (!mdResponse.ok) {
                        throw new Error(`Failed to load ${post.file}`);
                    }
                    const markdown = await mdResponse.text();
                    const preview = extractPreview(markdown);
                    cards.push(renderBlogCard(post, preview));
                } catch (err) {
                    console.error(`Error loading post ${post.slug}:`, err);
                    cards.push(`
                        <article class="blog-card blog-card--error">
                            <h3 class="blog-card__title">${escapeHtml(post.title)}</h3>
                            <p>Failed to load preview: ${escapeHtml(err.message)}</p>
                        </article>
                    `);
                }
            }

            blogList.innerHTML = cards.join('\n');
            blogPager.innerHTML = renderPagination(validPage, totalPages);

        } catch (err) {
            console.error('Error initializing blog:', err);
            blogList.innerHTML = `
                <div class="blog-error">
                    <p>Failed to load blog posts: ${escapeHtml(err.message)}</p>
                </div>
            `;
        }
    }

    // Initialize on page load
    init();
})();
