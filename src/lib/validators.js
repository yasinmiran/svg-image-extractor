/**
 * @fileoverview Input validation utilities
 * @module lib/validators
 */

/**
 * Validates URL format
 *
 * Checks if the provided string is a valid HTTP or HTTPS URL.
 *
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid HTTP/HTTPS URL
 *
 * @example
 * isValidUrl('https://example.com/image.svg'); // true
 * isValidUrl('not-a-url'); // false
 */
export function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates SVG content
 *
 * Performs basic validation to ensure the content is likely valid SVG.
 * Checks for empty content and presence of SVG tags.
 *
 * @param {string} content - SVG content to validate
 * @returns {{valid: boolean, error: string|null}} Validation result
 *
 * @example
 * isValidSvg('<svg>...</svg>'); // { valid: true, error: null }
 * isValidSvg(''); // { valid: false, error: 'SVG content is empty' }
 */
export function isValidSvg(content) {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'SVG content is empty' };
  }

  if (!content.includes('<svg')) {
    return { valid: false, error: 'Content does not appear to be valid SVG' };
  }

  return { valid: true, error: null };
}

/**
 * Validates file
 *
 * Checks file size and type to ensure it's a valid SVG file under the size limit.
 *
 * @param {File} file - File object to validate
 * @returns {{valid: boolean, error: string|null}} Validation result
 *
 * @example
 * isValidFile(fileObject); // { valid: true, error: null }
 */
export function isValidFile(file) {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const validTypes = ['image/svg+xml', 'text/xml', 'application/xml'];

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  // Check MIME type or file extension
  if (!validTypes.includes(file.type) && !file.name.endsWith('.svg')) {
    return { valid: false, error: 'File must be an SVG file' };
  }

  return { valid: true, error: null };
}
