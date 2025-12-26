import { describe, it, expect } from 'vitest';
import {
  ValidationError,
  FetchError,
  ParseError,
  handleError
} from '../../src/lib/errorHandler.js';

describe('errorHandler', () => {
  describe('Custom Error Classes', () => {
    it('should create ValidationError with field', () => {
      const error = new ValidationError('Invalid input', 'email');
      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe('Invalid input');
      expect(error.field).toBe('email');
    });

    it('should create FetchError with URL and status', () => {
      const error = new FetchError('Not found', 'https://example.com', 404);
      expect(error.name).toBe('FetchError');
      expect(error.message).toBe('Not found');
      expect(error.url).toBe('https://example.com');
      expect(error.statusCode).toBe(404);
    });

    it('should create ParseError', () => {
      const error = new ParseError('Invalid SVG');
      expect(error.name).toBe('ParseError');
      expect(error.message).toBe('Invalid SVG');
    });
  });

  describe('handleError', () => {
    it('should handle ValidationError', () => {
      const error = new ValidationError('Field is required');
      const message = handleError(error);
      expect(message).toBe('Field is required');
    });

    it('should handle FetchError with CORS', () => {
      const error = new FetchError('CORS policy blocked');
      const message = handleError(error);
      expect(message).toContain('CORS');
    });

    it('should handle FetchError with timeout', () => {
      const error = new FetchError('Request timeout');
      const message = handleError(error);
      expect(message).toContain('timed out');
    });

    it('should handle ParseError', () => {
      const error = new ParseError('Failed to parse');
      const message = handleError(error);
      expect(message).toContain('parse SVG');
    });

    it('should handle network errors', () => {
      const error = new TypeError('fetch failed');
      const message = handleError(error);
      expect(message).toContain('Network error');
    });

    it('should handle generic errors', () => {
      const error = new Error('Something went wrong');
      const message = handleError(error);
      expect(message).toBe('Something went wrong');
    });

    it('should provide fallback for errors without message', () => {
      const error = new Error();
      const message = handleError(error);
      expect(message).toContain('unexpected error');
    });
  });
});
