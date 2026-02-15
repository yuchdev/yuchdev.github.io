// assets/blog.js

// ============================================================================
// Shared Utilities (used by both blog list and article pages)
// ============================================================================

// Configuration constants
const READING_SPEED_WPM = 200;
const MAX_CACHE_SIZE = 250000;

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
 * Removes YAML front matter from Markdown
 * @param {string} Markdown
 * @returns {string}
 */
function removeFrontMatter(Markdown) {
    if (Markdown.trim().startsWith('---')) {
        const lines = Markdown.split('\n');
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
    return Markdown;
}

/**
 * Removes fenced code blocks from Markdown
 * @param {string} Markdown
 * @returns {string}
 */
function removeCodeBlocks(Markdown) {
    return Markdown.replace(/```[\s\S]*?```/g, '');
}

/**
 * Converts Markdown to plain text for length measurement
 * @param {string} Markdown
 * @returns {string}
 */
function markdownToPlainText(Markdown) {
    let text = Markdown;
    // Remove inline code
    text = text.replace(/`([^`]+)`/g, '$1');
    // Remove emphasis markers
    text = text.replace(/[*_~]/g, '');
    // Transform links [text](url) → text
    text = text.replace(/\[([^\]]+)]\([^)]+\)/g, '$1');
    // Remove heading markers
    text = text.replace(/^#+\s+/gm, '');
    return text;
}

/**
 * Calculates reading time for text
 * @param {string} text - plain text
 * @returns {number} - reading time in minutes
 */
function calculateReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / READING_SPEED_WPM));
}

/**
 * Gets Markdown from cache or fetches it
 * @param {string} slug - post slug
 * @param {string} date - post date
 * @param {string} file - Markdown file path
 * @returns {Promise<string>} - Markdown content
 */
async function getCachedMarkdown(slug, date, file) {
    const cacheKey = `md:${slug}:${date}`;
    
    // Try to get from the cache
    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            return cached;
        }
    } catch (e) {
        // sessionStorage might be disabled
        console.warn('sessionStorage not available:', e);
    }

    // Fetch Markdown
    const response = await fetch(baseUrl('articles/' + file));
    if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
    }
    const Markdown = await response.text();

    // Cache it (with size limit)
    if (Markdown.length <= MAX_CACHE_SIZE) {
        try {
            sessionStorage.setItem(cacheKey, Markdown);
        } catch (e) {
            // Quota exceeded or other error - not critical
            console.warn('Failed to cache Markdown:', e);
        }
    }

    return Markdown;
}

// ============================================================================
// Blog List Page
// ============================================================================

(() => {
    // Only run on blog.html
    if (!document.querySelector("#blog-list")) return;

    /**
     * Splits Markdown into paragraphs (blank-line separated)
     * @param {string} Markdown
     * @returns {string[]}
     */
    function splitIntoParagraphs(Markdown) {
        return Markdown
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
        // Look for sentence boundaries: `.!?…` followed by space
        // Allow optional closing quote/bracket before whitespace
        const boundaryRegex = /[.!?…]["\])]?\s/;
        const match = afterThreshold.match(boundaryRegex);
        
        if (match) {
            return 300 + match.index + match[0].length - 1; // -1 to not include trailing space
        }
        return -1; // No boundary found
    }

    /**
     * Extracts preview from Markdown according to the specified rules
     * @param {string} Markdown
     * @returns {string[]} - array of paragraph HTML strings
     */
    function extractPreview(Markdown) {
        // Remove front matter and code blocks
        let content = removeFrontMatter(Markdown);
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

        // Otherwise, join all paragraphs and find the sentence boundary
        const allPlainText = paragraphs.map(p => markdownToPlainText(p)).join("\n\n");
        
        if (allPlainText.length <= 300) {
            // Return the full text as one paragraph
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
     * @param {number} readingTime - reading time in minutes (optional)
     * @returns {string}
     */
    function renderBlogCard(post, previewHtml, readingTime) {
        const tags = post.tags && post.tags.length > 0 
            ? `<span class="blog-tags">${post.tags.join(' • ')}</span>`
            : '';

        const readingTimeHtml = readingTime 
            ? `<span class="blog-reading-time">~${readingTime} min read</span>`
            : '';

        return `
            <article class="blog-card">
                <h3 class="blog-card__title">
                    <a href="./article.html?slug=${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a>
                </h3>
                <div class="blog-meta">
                    <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
                    ${tags}
                    ${readingTimeHtml}
                </div>
                <div class="blog-preview">
                    ${previewHtml.join('\n')}
                </div>
                <a class="blog-readmore" href="./article.html?slug=${escapeHtml(post.slug)}">Continue reading →</a>
            </article>
        `;
    }

    /**
     * Renders featured post block
     * @param {Object} post - post metadata
     * @param {string[]} previewHtml - array of preview paragraph HTML
     * @param {number} readingTime - reading time in minutes (optional)
     * @returns {string}
     */
    function renderFeaturedPost(post, previewHtml, readingTime) {
        const tags = post.tags && post.tags.length > 0 
            ? `<span class="blog-tags">${post.tags.join(' • ')}</span>`
            : '';

        const readingTimeHtml = readingTime 
            ? `<span class="blog-reading-time">~${readingTime} min read</span>`
            : '';

        // Use a shorter preview for the featured post (first paragraph only)
        const shortPreview = previewHtml.length > 0 ? previewHtml[0] : '';

        return `
            <article class="blog-featured">
                <div class="blog-featured__label">Latest Post</div>
                <h3 class="blog-featured__title">
                    <a href="./article.html?slug=${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a>
                </h3>
                <div class="blog-meta">
                    <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
                    ${tags}
                    ${readingTimeHtml}
                </div>
                <div class="blog-preview">
                    ${shortPreview}
                </div>
                <a class="blog-readmore" href="./article.html?slug=${escapeHtml(post.slug)}">Continue reading →</a>
            </article>
        `;
    }

    /**
     * Renders pagination UI
     * @param {number} currentPage
     * @param {number} totalPages
     * @param {string|null} tagFilter
     * @returns {string}
     */
    function renderPagination(currentPage, totalPages, tagFilter = null) {
        if (totalPages <= 1) return '';

        let html = '';
        
        // Previous button
        if (currentPage > 1) {
            const url = buildUrl({ page: currentPage - 1, tag: tagFilter });
            html += `<a href="${url}" class="pager-btn">← Prev</a>`;
        } else {
            html += `<span class="pager-btn pager-btn--disabled">← Prev</span>`;
        }

        // Page numbers with ellipsis logic: [1, …, p-1, p, p+1, …, N]
        const pages = [];
        
        if (totalPages <= 7) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page
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
            
            // Always show the last page
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
                const url = buildUrl({ page, tag: tagFilter });
                html += `<a href="${url}" class="pager-num">${page}</a>`;
            }
        });

        // Next button
        if (currentPage < totalPages) {
            const url = buildUrl({ page: currentPage + 1, tag: tagFilter });
            html += `<a href="${url}" class="pager-btn">Next →</a>`;
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
     * Gets tag filter from URL query params
     * @returns {string|null}
     */
    function getTagFilter() {
        const params = new URLSearchParams(window.location.search);
        return params.get('tag');
    }

    /**
     * Builds URL with query parameters
     * @param {Object} params - query parameters
     * @returns {string}
     */
    function buildUrl(params) {
        const url = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                url.set(key, value);
            }
        }
        const query = url.toString();
        return query ? `./blog.html?${query}` : './blog.html';
    }

    /**
     * Debounce function
     * @param {Function} func - function to debounce
     * @param {number} wait - milliseconds to wait
     * @returns {Function}
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Loads post with Markdown, preview, and reading time
     * @param {Object} post - post metadata
     * @returns {Promise<{preview: string[], readingTime: number}>}
     */
    async function loadPostMetadata(post) {
        const Markdown = await getCachedMarkdown(post.slug, post.date, post.file);
        const preview = extractPreview(Markdown);
        const plainText = markdownToPlainText(removeFrontMatter(removeCodeBlocks(Markdown)));
        const readingTime = calculateReadingTime(plainText);
        return { preview, readingTime };
    }

    /**
     * Main initialization function
     */
    async function init() {
        const blogList = document.getElementById('blog-list');
        const blogPager = document.getElementById('blog-pager');
        const searchInput = document.getElementById('blog-search');
        const blogHeader = document.querySelector('.section h2');
        
        let allPosts = [];
        let searchQuery = '';
        
        /**
         * Filters and renders posts based on the current state
         */
        async function renderPosts() {
            try {
                // Get current filters
                const tagFilter = getTagFilter();
                const currentPage = getCurrentPage();
                
                // Apply tag filter
                let filteredPosts = allPosts;
                if (tagFilter) {
                    filteredPosts = allPosts.filter(post => 
                        post.tags && post.tags.some(tag => 
                            tag.toLowerCase() === tagFilter.toLowerCase()
                        )
                    );
                }

                // Apply search filter
                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase().trim();
                    const searchResults = [];
                    
                    for (const post of filteredPosts) {
                        // Search in title and tags
                        const titleMatch = post.title.toLowerCase().includes(query);
                        const tagsMatch = post.tags && post.tags.some(tag => 
                            tag.toLowerCase().includes(query)
                        );
                        
                        if (titleMatch || tagsMatch) {
                            searchResults.push(post);
                            continue;
                        }
                        
                        // Search in preview text if available in cache
                        const cacheKey = `md:${post.slug}:${post.date}`;
                        try {
                            const cached = sessionStorage.getItem(cacheKey);
                            if (cached) {
                                const content = removeFrontMatter(removeCodeBlocks(cached));
                                const plainText = markdownToPlainText(content);
                                if (plainText.toLowerCase().includes(query)) {
                                    searchResults.push(post);
                                }
                            }
                        } catch (e) {
                            // sessionStorage not available or error
                        }
                    }
                    
                    filteredPosts = searchResults;
                }

                // Update header with filter info
                let headerText = 'Blog';
                if (tagFilter) {
                    headerText += ` — tag: ${escapeHtml(tagFilter)}`;
                }
                if (searchQuery.trim()) {
                    headerText += ` — search: "${escapeHtml(searchQuery.trim())}"`;
                }
                blogHeader.innerHTML = headerText;

                // Show filter controls if needed
                let filterControls = '';
                if (tagFilter || searchQuery.trim()) {
                    filterControls = `<div class="blog-filter-controls">`;
                    if (tagFilter) {
                        filterControls += `<a href="../blog.html" class="blog-clear-filter">Clear tag filter</a>`;
                    }
                    if (searchQuery.trim()) {
                        filterControls += `<button class="blog-clear-search" id="clear-search">Clear search</button>`;
                    }
                    filterControls += `</div>`;
                }

                // Check if we have any posts to show
                if (filteredPosts.length === 0) {
                    let message = 'No posts found';
                    if (tagFilter && !searchQuery.trim()) {
                        message = `No posts for tag: ${escapeHtml(tagFilter)}`;
                    } else if (searchQuery.trim()) {
                        message = 'No posts match your search';
                    }
                    
                    blogList.innerHTML = filterControls + `
                        <div class="blog-error">
                            <p>${message}</p>
                        </div>
                    `;
                    blogPager.innerHTML = '';
                    
                    // Add a clear search handler
                    attachClearSearchHandler();
                    return;
                }

                // Pagination
                const pageSize = 10;
                const totalPages = Math.ceil(filteredPosts.length / pageSize);
                
                // Clamp page to valid range
                const validPage = Math.min(currentPage, Math.max(1, totalPages));
                
                // Feature the newest post (first in the list)
                let featuredHtml = '';
                let postsToShow = filteredPosts;
                
                // Only show featured on the first page without filters
                if (validPage === 1 && !tagFilter && !searchQuery.trim() && filteredPosts.length > 0) {
                    const newestPost = filteredPosts[0];
                    try {
                        const { preview, readingTime } = await loadPostMetadata(newestPost);
                        featuredHtml = renderFeaturedPost(newestPost, preview, readingTime);
                        
                        // Remove featured post from the paginated list
                        postsToShow = filteredPosts.slice(1);
                    } catch (err) {
                        console.error(`Error loading featured post ${newestPost.slug}:`, err);
                    }
                }
                
                // Recalculate pagination after removing the featured post
                const adjustedTotalPages = postsToShow.length === 0 ? 0 : Math.ceil(postsToShow.length / pageSize);
                const adjustedValidPage = postsToShow.length === 0 ? 0 : Math.min(validPage, Math.max(1, adjustedTotalPages));
                
                const startIdx = (adjustedValidPage - 1) * pageSize;
                const endIdx = Math.min(startIdx + pageSize, postsToShow.length);
                const pageSlice = postsToShow.slice(startIdx, endIdx);

                // Fetch and render posts
                const cards = [];
                for (const post of pageSlice) {
                    try {
                        const { preview, readingTime } = await loadPostMetadata(post);
                        cards.push(renderBlogCard(post, preview, readingTime));
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

                blogList.innerHTML = filterControls + featuredHtml + cards.join('\n');
                blogPager.innerHTML = renderPagination(adjustedValidPage, adjustedTotalPages, tagFilter);
                
                // Add a clear search handler
                attachClearSearchHandler();

            } catch (err) {
                console.error('Error rendering blog:', err);
                blogList.innerHTML = `
                    <div class="blog-error">
                        <p>Failed to render blog posts: ${escapeHtml(err.message)}</p>
                    </div>
                `;
            }
        }

        /**
         * Attaches handler for clear search button
         */
        function attachClearSearchHandler() {
            const clearBtn = document.getElementById('clear-search');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    searchQuery = '';
                    renderPosts();
                });
            }
        }

        try {
            // Load manifest
            const manifestResponse = await fetch(baseUrl('articles/index.json'));
            if (!manifestResponse.ok) {
                console.error(`Failed to load manifest: ${manifestResponse.status}`);
                blogList.innerHTML = `
                    <div class="blog-error">
                        <p>Failed to load blog posts: Failed to load manifest: ${manifestResponse.status}</p>
                    </div>
                `;
                return;
            }
            const manifest = await manifestResponse.json();

            // Sort by date (newest first)
            allPosts = manifest.sort((a, b) => b.date.localeCompare(a.date));

            // Initial render
            await renderPosts();

            // Set up a search handler (debounced)
            if (searchInput) {
                const debouncedSearch = debounce(() => {
                    searchQuery = searchInput.value;
                    // Reset to page 1 on search
                    const tagFilter = getTagFilter();
                    if (searchQuery.trim() || tagFilter) {
                        const url = buildUrl({ tag: tagFilter });
                        window.history.replaceState({}, '', url);
                    }
                    renderPosts();
                }, 250);

                searchInput.addEventListener('input', debouncedSearch);
            }

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
    init().then(() => console.log('Blog list initialized successfully'));
})();

// Article page functionality
(() => {
    // Only run on article.html
    if (!document.querySelector("#article")) return;

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
     * Checks if URL is safe (http, https, mailto, or relative)
     * @param {string} url
     * @returns {boolean}
     */
    function isSafeUrl(url) {
        if (!url) return false;
        const trimmed = url.trim();
        // Allow relative URLs
        if (!trimmed.includes(':')) return true;
        // Allow only http, https, mailto
        return /^(https?|mailto):/i.test(trimmed);
    }

    /**
     * Converts Markdown to safe HTML
     * @param {string} Markdown
     * @returns {string}
     */
    function markdownToHtml(Markdown) {
        // First, escape all HTML
        let html = escapeHtml(Markdown);
        
        // Process fenced code blocks first (```lang\n...\n```)
        html = html.replace(/```([^\n]*)\n([\s\S]*?)```/g, (match, lang, code) => {
            // code is already escaped
            return `<pre><code>${code.trim()}</code></pre>`;
        });

        // Split into lines for processing
        const lines = html.split('\n');
        const result = [];
        let inList = false;
        let currentParagraph = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();

            // Skip empty lines - they end paragraphs
            if (trimmedLine === '') {
                if (currentParagraph.length > 0) {
                    result.push(`<p>${currentParagraph.join('<br>')}</p>`);
                    currentParagraph = [];
                }
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                continue;
            }

            // Check if a line is already a code block (from our pre-processing)
            if (trimmedLine.startsWith('&lt;pre&gt;&lt;code&gt;')) {
                if (currentParagraph.length > 0) {
                    result.push(`<p>${currentParagraph.join('<br>')}</p>`);
                    currentParagraph = [];
                }
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                // Find the end of the code block
                let codeBlock = [line];
                while (i + 1 < lines.length && !lines[i + 1].includes('&lt;/code&gt;&lt;/pre&gt;')) {
                    i++;
                    codeBlock.push(lines[i]);
                }
                if (i + 1 < lines.length) {
                    i++;
                    codeBlock.push(lines[i]);
                }
                // Unescape the code block tags
                result.push(codeBlock.join('\n')
                    .replace(/&lt;pre&gt;&lt;code&gt;/g, '<pre><code>')
                    .replace(/&lt;\/code&gt;&lt;\/pre&gt;/g, '</code></pre>'));
                continue;
            }

            // Headings (# to ######)
            const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
            if (headingMatch) {
                if (currentParagraph.length > 0) {
                    result.push(`<p>${currentParagraph.join('<br>')}</p>`);
                    currentParagraph = [];
                }
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                const level = headingMatch[1].length;
                const text = headingMatch[2];
                result.push(`<h${level}>${processInline(text)}</h${level}>`);
                continue;
            }

            // Unordered list items (- item)
            const listMatch = trimmedLine.match(/^-\s+(.+)$/);
            if (listMatch) {
                if (currentParagraph.length > 0) {
                    result.push(`<p>${currentParagraph.join('<br>')}</p>`);
                    currentParagraph = [];
                }
                if (!inList) {
                    result.push('<ul>');
                    inList = true;
                }
                const itemText = listMatch[1];
                result.push(`<li>${processInline(itemText)}</li>`);
                continue;
            }

            // Regular text - accumulate into current paragraph
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            currentParagraph.push(processInline(trimmedLine));
        }

        // Close any open paragraph or list
        if (currentParagraph.length > 0) {
            result.push(`<p>${currentParagraph.join('<br>')}</p>`);
        }
        if (inList) {
            result.push('</ul>');
        }

        return result.join('\n');
    }

    /**
     * Process inline Markdown (code, links)
     * @param {string} text - already HTML-escaped text
     * @returns {string}
     */
    function processInline(text) {
        // Inline code: `code` (text is already escaped)
        text = text.replace(/`([^`]+)`/g, (match, code) => {
            return `<code>${code}</code>`;
        });

        // Links: [text](url) (text is already escaped)
        text = text.replace(/\[([^\]]+)]\(([^)]+)\)/g, (match, linkText, url) => {
            if (isSafeUrl(url)) {
                return `<a href="${url}">${linkText}</a>`;
            } else {
                // Unsafe URL - render as plain text
                return linkText;
            }
        });

        return text;
    }

    /**
     * Gets slug from URL query params
     * @returns {string|null}
     */
    function getSlug() {
        const params = new URLSearchParams(window.location.search);
        return params.get('slug');
    }

    /**
     * Renders article content
     * @param {Object} post - post metadata
     * @param {string} Markdown - Markdown content
     */
    function renderArticle(post, Markdown) {
        const articleEl = document.getElementById('article');
        
        // Remove front matter
        const content = removeFrontMatter(Markdown);
        
        // Convert Markdown to HTML
        const htmlContent = markdownToHtml(content);
        
        // Calculate reading time using a shared function
        const plainText = markdownToPlainText(removeCodeBlocks(content));
        const readingTime = calculateReadingTime(plainText);
        
        // Render article
        const titleHtml = post.display_title !== false ? `<h1>${escapeHtml(post.title)}</h1>` : '';
        articleEl.innerHTML = `
            ${titleHtml}
            <div class="blog-article-meta">
                <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
                <span class="blog-reading-time">~${readingTime} min read</span>
            </div>
            ${htmlContent}
        `;
    }

    /**
     * Shows error message
     * @param {string} message
     */
    function showError(message) {
        const articleEl = document.getElementById('article');
        articleEl.innerHTML = `
            <div class="blog-error">
                <p>${escapeHtml(message)}</p>
                <p><a href="./blog.html">← Back to Blog</a></p>
            </div>
        `;
    }

    /**
     * Main initialization function
     */
    async function init() {
        try {
            // Get slug from URL
            const slug = getSlug();
            if (!slug) {
                showError('No article specified. Please provide a slug parameter.');
                return;
            }

            // Load manifest
            const manifestResponse = await fetch(baseUrl('articles/index.json'));
            if (!manifestResponse.ok) {
                showError(`Failed to load manifest: ${manifestResponse.status}`);
                return;
            }
            const manifest = await manifestResponse.json();

            // Find post by slug
            const post = manifest.find(p => p.slug === slug);
            if (!post) {
                showError(`Article not found: "${slug}"`);
                return;
            }

            // Load Markdown (with caching)
            const Markdown = await getCachedMarkdown(post.slug, post.date, post.file);

            // Render article
            renderArticle(post, Markdown);

        } catch (err) {
            console.error('Error loading article:', err);
            showError(`Failed to load article: ${err.message}`);
        }
    }

    // Initialize on page load
    init().then(() => console.log('Article initialized successfully'));
})();

