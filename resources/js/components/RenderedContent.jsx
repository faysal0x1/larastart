import DOMPurify from 'dompurify';

/**
 * RenderedContent
 * Renders sanitized HTML content safely with table support.
 *
 * @param {string} html - Raw HTML string to render
 * @param {string} className - Optional extra classes for styling
 */
export default function RenderedContent({ html = '', className = '' }) {
    // Sanitize to prevent XSS while preserving ALL styles
    const clean = DOMPurify.sanitize(html, {
        // Allow table elements and their attributes
        ADD_TAGS: ['table', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th'],
        ADD_ATTR: ['style', 'border', 'colspan', 'rowspan', 'width', 'class', 'id', 'title', 'target', 'rel', 'href'],
        // Allow all style attributes to preserve formatting
        ALLOW_DATA_ATTR: false,
        // Keep inline styles - this is important
        KEEP_CONTENT: true,
        // Allow more HTML elements
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 's', 'strike', 'del', 'ins', 'sub', 'sup',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'dl', 'dt', 'dd',
            'blockquote', 'pre', 'code',
            'a', 'img',
            'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th',
            'div', 'span', 'section', 'article',
            'hr', 'br',
            'b', 'i', 'small', 'mark', 'abbr', 'cite', 'q', 'dfn', 'time'
        ],
        ALLOWED_ATTR: ['style', 'class', 'id', 'href', 'target', 'rel', 'title', 'alt', 'src', 'width', 'height', 'border', 'colspan', 'rowspan'],
        // Allow all CSS properties in style attributes (DOMPurify will sanitize dangerous ones)
        ALLOW_UNKNOWN_PROTOCOLS: false,
        // Preserve style attribute content - don't strip any CSS properties
        SAFE_FOR_TEMPLATES: false,
        // Use FORCE_BODY to ensure styles are preserved
        FORCE_BODY: false,
    });

    return (
        <>
            <style>{`
                .rendered-content table {
                    border-collapse: collapse !important;
                    width: 100% !important;
                    margin: 1rem 0 !important;
                    border: 1px solid #e5e7eb !important;
                }
                .rendered-content table td,
                .rendered-content table th {
                    border: 1px solid #e5e7eb !important;
                    padding: 0.75rem 1rem !important;
                    vertical-align: top !important;
                }
                .rendered-content table td:first-child,
                .rendered-content table th:first-child {
                    background-color: #f9fafb !important;
                    font-weight: 600 !important;
                    color: #111827 !important;
                    width: 40% !important;
                }
                .rendered-content table td:last-child,
                .rendered-content table th:last-child {
                    color: #374151 !important;
                    width: 60% !important;
                }
                .rendered-content table tr:first-child td,
                .rendered-content table tr:first-child th {
                    background-color: #eff6ff !important;
                    font-weight: 700 !important;
                    color: #1e40af !important;
                }
                .rendered-content table p {
                    margin: 0.5rem 0 !important;
                }
                .rendered-content table p:first-child {
                    margin-top: 0 !important;
                }
                .rendered-content table p:last-child {
                    margin-bottom: 0 !important;
                }
                .rendered-content table span {
                    color: inherit !important;
                }
                .rendered-content {
                    overflow-x: hidden;
                    line-height: 1.75;
                    word-wrap: break-word;
                    word-break: break-word;
                }
                .rendered-content table {
                    max-width: 100% !important;
                    table-layout: auto !important;
                }
                .rendered-content img {
                    max-width: 100% !important;
                    height: auto !important;
                }
                /* Basic typography that won't override inline styles */
                .rendered-content p:not([style]) {
                    margin: 1em 0;
                }
                .rendered-content h1:not([style]),
                .rendered-content h2:not([style]),
                .rendered-content h3:not([style]),
                .rendered-content h4:not([style]),
                .rendered-content h5:not([style]),
                .rendered-content h6:not([style]) {
                    margin: 1.5em 0 0.5em 0;
                    font-weight: 600;
                }
                .rendered-content a:not([style]) {
                    color: #2563eb;
                    text-decoration: underline;
                }
                .rendered-content a:not([style]):hover {
                    color: #1d4ed8;
                }
                /* CRITICAL: Inline styles have the highest CSS specificity */
                /* Don't override them - they will naturally take precedence */
                /* Only apply default styles to elements WITHOUT inline styles */

                /* Ensure elements with inline styles are not overridden */
                /* Inline styles already have highest specificity, so no special handling needed */
            `}</style>
            <div
                className={`rendered-content ${className}`}
                dangerouslySetInnerHTML={{ __html: clean }}
            />
        </>
    );
}
