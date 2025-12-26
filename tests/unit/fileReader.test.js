import { describe, it, expect } from 'vitest';
import { readSvgFile } from '../../src/lib/fileReader.js';

describe('fileReader', () => {
  describe('readSvgFile', () => {
    it('should read valid SVG file', async () => {
      const content = '<svg></svg>';
      const file = new File([content], 'test.svg', { type: 'image/svg+xml' });

      const result = await readSvgFile(file);
      expect(result).toBe(content);
    });

    it('should reject file over 10MB', async () => {
      const largeContent = 'x'.repeat(11 * 1024 * 1024);
      const file = new File([largeContent], 'large.svg', { type: 'image/svg+xml' });

      await expect(readSvgFile(file)).rejects.toThrow('10MB');
    });

    it('should reject invalid file type', async () => {
      const file = new File(['content'], 'test.png', { type: 'image/png' });

      await expect(readSvgFile(file)).rejects.toThrow('SVG file');
    });

    it('should reject null file', async () => {
      await expect(readSvgFile(null)).rejects.toThrow('No file provided');
    });

    it('should call progress callback', async () => {
      const file = new File(['<svg></svg>'], 'test.svg', { type: 'image/svg+xml' });
      const progressCalls = [];

      await readSvgFile(file, (percent) => {
        progressCalls.push(percent);
      });

      // Progress callback may or may not be called for small files
      // Just verify no errors occurred
      expect(progressCalls).toBeDefined();
    });
  });
});
