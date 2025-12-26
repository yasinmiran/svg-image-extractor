import { describe, it, expect } from 'vitest';
import { isValidUrl, isValidSvg, isValidFile } from '../../src/lib/validators.js';

describe('validators', () => {
  describe('isValidUrl', () => {
    it('should validate HTTPS URLs', () => {
      expect(isValidUrl('https://example.com/image.svg')).toBe(true);
    });

    it('should validate HTTP URLs', () => {
      expect(isValidUrl('http://example.com/image.svg')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });

    it('should reject non-http protocols', () => {
      expect(isValidUrl('file:///path/to/file.svg')).toBe(false);
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
    });
  });

  describe('isValidSvg', () => {
    it('should validate valid SVG content', () => {
      const result = isValidSvg('<svg><circle /></svg>');
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should reject empty content', () => {
      const result = isValidSvg('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SVG content is empty');
    });

    it('should reject whitespace-only content', () => {
      const result = isValidSvg('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SVG content is empty');
    });

    it('should reject non-SVG content', () => {
      const result = isValidSvg('<div>Not SVG</div>');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Content does not appear to be valid SVG');
    });
  });

  describe('isValidFile', () => {
    it('should validate valid SVG file', () => {
      const file = new File(['<svg></svg>'], 'test.svg', { type: 'image/svg+xml' });
      const result = isValidFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should reject files over 10MB', () => {
      const largeContent = 'x'.repeat(11 * 1024 * 1024); // 11MB
      const file = new File([largeContent], 'large.svg', { type: 'image/svg+xml' });
      const result = isValidFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('File size exceeds 10MB limit');
    });

    it('should reject invalid file types', () => {
      const file = new File(['content'], 'test.png', { type: 'image/png' });
      const result = isValidFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('File must be an SVG file');
    });

    it('should accept SVG files with .svg extension even if type is wrong', () => {
      const file = new File(['<svg></svg>'], 'test.svg', { type: '' });
      const result = isValidFile(file);
      expect(result.valid).toBe(true);
    });

    it('should reject null file', () => {
      const result = isValidFile(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('No file provided');
    });

    it('should accept text/xml type', () => {
      const file = new File(['<svg></svg>'], 'test.svg', { type: 'text/xml' });
      const result = isValidFile(file);
      expect(result.valid).toBe(true);
    });
  });
});
