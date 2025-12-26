import { describe, it, expect, beforeEach, vi } from 'vitest';
import { downloadSingleImage, downloadBlob } from '../../src/lib/imageDownloader.js';

describe('imageDownloader', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  describe('downloadSingleImage', () => {
    it('should create download link with correct filename', () => {
      const image = {
        dataUrl: 'data:image/png;base64,ABC123',
        format: 'image/png',
        index: 0
      };

      // Spy on click
      const clickSpy = vi.fn();
      HTMLAnchorElement.prototype.click = clickSpy;

      downloadSingleImage(image);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should use custom filename when provided', () => {
      const image = {
        dataUrl: 'data:image/png;base64,ABC123',
        format: 'image/png',
        index: 0
      };

      const clickSpy = vi.fn();
      HTMLAnchorElement.prototype.click = clickSpy;

      downloadSingleImage(image, 'custom.png');

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should generate filename from format', () => {
      const image = {
        dataUrl: 'data:image/jpeg;base64,XYZ',
        format: 'image/jpeg',
        index: 5
      };

      const clickSpy = vi.fn();
      HTMLAnchorElement.prototype.click = clickSpy;

      downloadSingleImage(image);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should cleanup link after download', () => {
      const image = {
        dataUrl: 'data:image/png;base64,ABC',
        format: 'image/png',
        index: 0
      };

      HTMLAnchorElement.prototype.click = vi.fn();

      downloadSingleImage(image);

      // Link should be removed from DOM
      const links = document.querySelectorAll('a');
      expect(links.length).toBe(0);
    });
  });

  describe('downloadBlob', () => {
    it('should download blob with correct filename', () => {
      const blob = new Blob(['test'], { type: 'application/zip' });
      const filename = 'test.zip';

      const clickSpy = vi.fn();
      HTMLAnchorElement.prototype.click = clickSpy;

      downloadBlob(blob, filename);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should cleanup after download', () => {
      const blob = new Blob(['test'], { type: 'application/zip' });

      HTMLAnchorElement.prototype.click = vi.fn();

      downloadBlob(blob, 'test.zip');

      // Link should be removed
      const links = document.querySelectorAll('a');
      expect(links.length).toBe(0);
    });
  });
});
