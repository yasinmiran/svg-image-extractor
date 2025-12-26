/**
 * @fileoverview ZIP file generation for bulk image downloads
 * @module lib/zipGenerator
 */

import JSZip from 'jszip';
import { ERROR_MESSAGES } from '../constants/messages.js';

/**
 * Generates a ZIP file from multiple images
 *
 * Creates a ZIP archive containing all provided images with proper filenames.
 * Supports progress tracking via callback for user feedback during generation.
 *
 * @param {Array<Object>} images - Array of extracted image objects
 * @param {Function} [progressCallback] - Optional callback for progress updates (receives percent)
 * @returns {Promise<Blob>} ZIP file as Blob
 * @throws {Error} If ZIP generation fails
 *
 * @example
 * const zipBlob = await generateZip(images, (percent) => {
 *   console.log(`Progress: ${percent}%`);
 * });
 */
export async function generateZip(images, progressCallback = null) {
  if (!images || images.length === 0) {
    throw new Error('No images provided for ZIP generation');
  }

  try {
    const zip = new JSZip();

    // Add each image to the ZIP (filter valid images first)
    const validImages = images.filter((img, index) => {
      const base64Data = img.dataUrl?.split(',')[1];
      if (!base64Data || base64Data.length === 0) {
        console.warn(`Image at index ${index} has no valid base64 data, skipping`);
        return false;
      }
      return true;
    });

    if (validImages.length === 0) {
      throw new Error('No valid images to include in ZIP');
    }

    validImages.forEach((img, index) => {
      const filename = generateFilename(img, index);
      const base64Data = img.dataUrl.split(',')[1];

      // Add file to ZIP
      zip.file(filename, base64Data, { base64: true });
    });

    // Generate ZIP with compression
    const blob = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6 // Balance between speed and size
        }
      },
      (metadata) => {
        // Progress callback
        if (progressCallback) {
          progressCallback(Math.round(metadata.percent));
        }
      }
    );

    return blob;

  } catch (error) {
    console.error('ZIP generation failed:', error);
    throw new Error(ERROR_MESSAGES.ZIP_GENERATION_FAILED);
  }
}

/**
 * Generates a filename for an image
 *
 * Creates descriptive filenames based on image format and index.
 * Format: image-{number}.{extension}
 *
 * @param {Object} image - Image object
 * @param {string} image.format - Image MIME type
 * @param {number} index - Image index
 * @returns {string} Generated filename
 *
 * @example
 * generateFilename({ format: 'image/png' }, 0); // 'image-1.png'
 * generateFilename({ format: 'image/jpeg' }, 5); // 'image-6.jpeg'
 */
export function generateFilename(image, index) {
  // Extract extension from MIME type
  // e.g., 'image/png' -> 'png'
  const format = image.format || 'image/png';
  const ext = format.split('/')[1] || 'png';

  // Use 1-based numbering for user-friendliness
  return `image-${index + 1}.${ext}`;
}

/**
 * Checks if browser supports ZIP generation
 *
 * Useful for feature detection before attempting ZIP creation.
 *
 * @returns {boolean} True if ZIP generation is supported
 *
 * @example
 * if (isZipSupported()) {
 *   // Show "Download All as ZIP" button
 * }
 */
export function isZipSupported() {
  try {
    return typeof Blob !== 'undefined' && typeof JSZip !== 'undefined';
  } catch {
    return false;
  }
}
