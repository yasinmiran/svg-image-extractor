/**
 * @fileoverview File reading utilities with validation
 * @module lib/fileReader
 */

import { ValidationError } from './errorHandler.js';
import { isValidFile } from './validators.js';

/**
 * Reads SVG file content with validation
 *
 * Validates file size and type before reading. Supports progress callbacks
 * for large files.
 *
 * @param {File} file - File object to read
 * @param {Function} [progressCallback] - Optional callback for progress updates
 * @returns {Promise<string>} File content as text
 * @throws {ValidationError} If file is invalid or too large
 * @throws {Error} If file reading fails
 *
 * @example
 * const content = await readSvgFile(file, (percent) => {
 *   console.log(`Reading: ${percent}%`);
 * });
 */
export async function readSvgFile(file, progressCallback = null) {
  // Validate file
  const validation = isValidFile(file);
  if (!validation.valid) {
    throw new ValidationError(validation.error, 'file');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Progress tracking
    if (progressCallback) {
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          progressCallback(percent);
        }
      };
    }

    // Success handler
    reader.onload = () => {
      resolve(reader.result);
    };

    // Error handler
    reader.onerror = () => {
      reject(new Error(`Failed to read file: ${reader.error?.message || 'Unknown error'}`));
    };

    // Start reading
    reader.readAsText(file);
  });
}
