/**
 * @fileoverview User-facing messages for errors, success, and info
 * @module constants/messages
 */

export const ERROR_MESSAGES = {
  NO_INPUT: 'Please upload a file, enter a URL, or paste SVG code',
  INVALID_URL: 'Please enter a valid URL starting with http:// or https://',
  FETCH_FAILED: 'Failed to fetch SVG from URL. Please check the URL and try again.',
  CORS_ERROR: 'Unable to fetch from URL due to CORS restrictions. The server must allow cross-origin requests.',
  PARSE_ERROR: 'Failed to parse SVG content. Please ensure it is valid SVG.',
  FILE_TOO_LARGE: 'File size exceeds 10MB limit',
  INVALID_FILE_TYPE: 'Please select a valid SVG file',
  NO_IMAGES_FOUND: 'No embedded images found in the SVG file',
  ZIP_GENERATION_FAILED: 'Failed to generate ZIP file. Please try downloading images individually.',
  NETWORK_ERROR: 'Network error occurred. Please check your connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  INVALID_SVG: 'Content does not appear to be valid SVG',
  EMPTY_CONTENT: 'SVG content is empty'
};

export const SUCCESS_MESSAGES = {
  IMAGES_EXTRACTED: (count) => `Successfully extracted ${count} image${count > 1 ? 's' : ''}`,
  ZIP_READY: 'ZIP file is ready for download',
  FETCH_SUCCESS: 'Successfully loaded SVG from URL'
};

export const INFO_MESSAGES = {
  FETCHING_URL: 'Fetching SVG from URL...',
  PARSING_SVG: 'Parsing SVG content...',
  GENERATING_ZIP: 'Generating ZIP file...',
  READING_FILE: 'Reading file...'
};
