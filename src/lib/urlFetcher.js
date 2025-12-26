/**
 * @fileoverview URL fetching utilities with error handling
 * @module lib/urlFetcher
 */

import { FetchError, ValidationError } from './errorHandler.js';
import { isValidUrl } from './validators.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

/**
 * Fetches SVG content from URL with proper error handling
 *
 * Validates URL format, handles network errors, CORS issues, and timeouts.
 * Includes retry logic for transient failures.
 *
 * @param {string} url - URL to fetch from
 * @param {Object} [options={}] - Fetch options
 * @param {number} [options.timeout=30000] - Timeout in milliseconds
 * @param {number} [options.retries=0] - Number of retry attempts
 * @returns {Promise<string>} SVG content as text
 * @throws {ValidationError} If URL format is invalid
 * @throws {FetchError} For network or HTTP errors
 *
 * @example
 * const svg = await fetchSvgFromUrl('https://example.com/image.svg', {
 *   timeout: 10000,
 *   retries: 2
 * });
 */
export async function fetchSvgFromUrl(url, options = {}) {
  const { timeout = 30000, retries = 0 } = options;

  // Validate URL
  if (!isValidUrl(url)) {
    throw new ValidationError(ERROR_MESSAGES.INVALID_URL, 'url');
  }

  let lastError;

  // Retry logic
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        // Fetch with timeout
        const response = await fetch(url, {
          signal: controller.signal,
          mode: 'cors', // Explicitly request CORS
        });

        clearTimeout(timeoutId);

        // Check HTTP status
        if (!response.ok) {
          throw new FetchError(
            `HTTP ${response.status}: ${response.statusText}`,
            url,
            response.status
          );
        }

        // Get content
        const content = await response.text();

        // Validate it looks like SVG
        if (!content.includes('<svg')) {
          throw new FetchError(
            'URL did not return SVG content',
            url,
            response.status
          );
        }

        return content;

      } catch (error) {
        clearTimeout(timeoutId);

        // Handle abort (timeout)
        if (error.name === 'AbortError') {
          throw new FetchError(ERROR_MESSAGES.TIMEOUT_ERROR, url);
        }

        // Handle CORS errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new FetchError(ERROR_MESSAGES.CORS_ERROR, url);
        }

        throw error;
      }

    } catch (error) {
      lastError = error;

      // Don't retry validation errors or CORS errors
      if (error instanceof ValidationError || error.message.includes('CORS')) {
        throw error;
      }

      // If not last attempt, continue to retry
      if (attempt < retries) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        continue;
      }
    }
  }

  // All retries failed
  throw lastError;
}
