/**
 * @fileoverview Error handling utilities and custom error classes
 * @module lib/errorHandler
 */

import { ERROR_MESSAGES } from '../constants/messages.js';

/**
 * Custom error for validation failures
 */
export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Custom error for fetch/network failures
 */
export class FetchError extends Error {
  constructor(message, url = null, statusCode = null) {
    super(message);
    this.name = 'FetchError';
    this.url = url;
    this.statusCode = statusCode;
  }
}

/**
 * Custom error for SVG parsing failures
 */
export class ParseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ParseError';
  }
}

/**
 * Handles errors and returns user-friendly messages
 *
 * Converts technical errors into messages users can understand and act upon.
 * Logs full error details to console for debugging.
 *
 * @param {Error} error - Error object to handle
 * @returns {string} User-friendly error message
 *
 * @example
 * try {
 *   await fetchSomething();
 * } catch (error) {
 *   const message = handleError(error);
 *   alert(message);
 * }
 */
export function handleError(error) {
  // Log full error for debugging
  console.error('Error occurred:', error);

  // Return user-friendly message based on error type
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof FetchError) {
    // Check for CORS-specific errors
    if (error.message.includes('CORS') || error.message.includes('cors')) {
      return ERROR_MESSAGES.CORS_ERROR;
    }
    // Check for timeout
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    }
    return error.message || ERROR_MESSAGES.FETCH_FAILED;
  }

  if (error instanceof ParseError) {
    return ERROR_MESSAGES.PARSE_ERROR;
  }

  // Handle network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Generic fallback
  return error.message || 'An unexpected error occurred. Please try again.';
}

/**
 * Displays error message to user using dialog
 *
 * @param {string} message - Error message to display
 * @param {string} [type='error'] - Message type (error, warning, info)
 *
 * @example
 * displayError('Something went wrong', 'error');
 */
export function displayError(message, type = 'error') {
  const dialog = document.getElementById('error-dialog');
  const messageEl = document.getElementById('error-message');

  if (dialog && messageEl) {
    messageEl.textContent = message;
    dialog.showModal();
  } else {
    // Fallback to alert if dialog not available
    alert(`Error: ${message}`);
  }
}

/**
 * Displays success message to user using dialog
 *
 * @param {string} message - Success message to display
 *
 * @example
 * displaySuccess('Images extracted successfully!');
 */
export function displaySuccess(message) {
  const dialog = document.getElementById('success-dialog');
  const messageEl = document.getElementById('success-message');

  if (dialog && messageEl) {
    messageEl.textContent = message;
    dialog.showModal();
  } else {
    // Fallback to alert if dialog not available
    alert(message);
  }
}

/**
 * Displays info message to user
 *
 * @param {string} message - Info message to display
 *
 * @example
 * displayInfo('Processing your request...');
 */
export function displayInfo(message) {
  console.info(message);
}
