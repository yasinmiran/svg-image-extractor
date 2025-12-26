import { describe, it, expect, vi } from 'vitest';
import { generateZip, generateFilename, isZipSupported } from '../../src/lib/zipGenerator.js';

describe('zipGenerator', () => {
  describe('generateFilename', () => {
    it('should generate filename with correct extension', () => {
      const image = { format: 'image/png' };
      expect(generateFilename(image, 0)).toBe('image-1.png');
      expect(generateFilename(image, 5)).toBe('image-6.png');
    });

    it('should handle different image formats', () => {
      expect(generateFilename({ format: 'image/jpeg' }, 0)).toBe('image-1.jpeg');
      expect(generateFilename({ format: 'image/gif' }, 0)).toBe('image-1.gif');
      expect(generateFilename({ format: 'image/webp' }, 0)).toBe('image-1.webp');
    });

    it('should use 1-based numbering', () => {
      const image = { format: 'image/png' };
      expect(generateFilename(image, 0)).toBe('image-1.png');
      expect(generateFilename(image, 1)).toBe('image-2.png');
      expect(generateFilename(image, 99)).toBe('image-100.png');
    });

    it('should handle missing format', () => {
      const filename = generateFilename({}, 0);
      expect(filename).toBe('image-1.png'); // Default to PNG
    });
  });

  describe('generateZip', () => {
    it('should generate ZIP from single image', async () => {
      const images = [
        {
          dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          format: 'image/png'
        }
      ];

      const blob = await generateZip(images);

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.size).toBeGreaterThan(0);
      expect(blob.type).toBe('application/zip');
    });

    it('should generate ZIP from multiple images', async () => {
      // Use valid base64 data (1x1 pixel images)
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const images = [
        { dataUrl: `data:image/png;base64,${validBase64}`, format: 'image/png' },
        { dataUrl: `data:image/jpeg;base64,${validBase64}`, format: 'image/jpeg' },
        { dataUrl: `data:image/gif;base64,${validBase64}`, format: 'image/gif' }
      ];

      const blob = await generateZip(images);

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.size).toBeGreaterThan(0);
    });

    it('should call progress callback', async () => {
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const images = [
        { dataUrl: `data:image/png;base64,${validBase64}`, format: 'image/png' }
      ];

      const progressCalls = [];
      await generateZip(images, (percent) => {
        progressCalls.push(percent);
      });

      // Progress callback should be called at least once
      expect(progressCalls.length).toBeGreaterThan(0);
      expect(progressCalls[progressCalls.length - 1]).toBe(100);
    });

    it('should throw error for empty images array', async () => {
      await expect(generateZip([])).rejects.toThrow('No images provided');
    });

    it('should throw error for null/undefined', async () => {
      await expect(generateZip(null)).rejects.toThrow();
      await expect(generateZip(undefined)).rejects.toThrow();
    });

    it('should handle images with missing base64 data', async () => {
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const images = [
        { dataUrl: `data:image/png;base64,${validBase64}`, format: 'image/png' },
        { dataUrl: 'data:image/png', format: 'image/png' }, // Missing base64
        { dataUrl: `data:image/png;base64,${validBase64}`, format: 'image/png' }
      ];

      // Should not throw, just skip invalid image
      const blob = await generateZip(images);
      expect(blob).toBeInstanceOf(Blob);
    });
  });

  describe('isZipSupported', () => {
    it('should return true in test environment', () => {
      expect(isZipSupported()).toBe(true);
    });
  });
});
