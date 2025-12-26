/**
 * @fileoverview Core SVG image extraction logic
 * @module lib/svgExtractor
 */

import { ParseError } from './errorHandler.js';
import { isValidSvg } from './validators.js';

/**
 * @typedef {Object} ExtractedImage
 * @property {string} dataUrl - Complete data URL (data:image/png;base64,...)
 * @property {string} format - Image MIME type (e.g., 'image/png')
 * @property {number} index - Zero-based index of image
 * @property {number} size - Estimated size in bytes
 * @property {string} id - Unique identifier for this image
 */

/**
 * Extracts all embedded images from SVG content
 *
 * Parses SVG markup using DOMParser and searches for <image> elements
 * with base64-encoded data URLs. Supports both 'href' and 'xlink:href' attributes.
 * Each extracted image includes metadata like format, size, and a unique ID.
 *
 * @param {string} svgContent - Raw SVG markup to parse
 * @returns {ExtractedImage[]} Array of extracted image objects
 * @throws {ParseError} If SVG content is malformed or cannot be parsed
 * @throws {Error} If svgContent is empty or invalid
 *
 * @example
 * const svg = '<svg><image href="data:image/png;base64,iVBORw0K..."/></svg>';
 * const images = extractImages(svg);
 * console.log(images.length); // 1
 * console.log(images[0].format); // 'image/png'
 */
export function extractImages(svgContent) {
  // Validate SVG content
  const validation = isValidSvg(svgContent);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Parse SVG using DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');

  // Check for parsing errors
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new ParseError('Failed to parse SVG content. The SVG may be malformed.');
  }

  // Find all <image> elements
  const imageElements = doc.querySelectorAll('image');
  const extractedImages = [];

  imageElements.forEach((img, index) => {
    // Try both 'href' and 'xlink:href' attributes (SVG 1.1 vs SVG 2)
    const href = img.getAttribute('href') || img.getAttribute('xlink:href');

    // Only process data URLs (embedded images)
    if (href && href.startsWith('data:image/')) {
      try {
        // Extract image format from data URL
        const format = href.split(';')[0].split(':')[1];

        // Estimate size (base64 is ~1.37x original size)
        const base64Data = href.split(',')[1] || '';
        const estimatedSize = Math.floor((base64Data.length * 3) / 4);

        // Generate unique ID
        const id = `img-${Date.now()}-${index}`;

        extractedImages.push({
          dataUrl: href,
          format,
          index,
          size: estimatedSize,
          id
        });
      } catch (error) {
        // Log error but continue processing other images
        console.warn(`Failed to process image at index ${index}:`, error);
      }
    }
  });

  return extractedImages;
}

/**
 * Counts embedded images in SVG without full extraction
 *
 * Useful for quickly checking if SVG contains images before full extraction.
 *
 * @param {string} svgContent - Raw SVG markup
 * @returns {number} Number of embedded images found
 *
 * @example
 * const count = countImages(svgContent);
 * if (count > 0) {
 *   console.log(`Found ${count} images`);
 * }
 */
export function countImages(svgContent) {
  try {
    const images = extractImages(svgContent);
    return images.length;
  } catch {
    return 0;
  }
}
