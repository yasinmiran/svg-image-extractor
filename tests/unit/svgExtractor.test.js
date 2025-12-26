import { describe, it, expect } from 'vitest';
import { extractImages, countImages } from '../../src/lib/svgExtractor.js';

describe('svgExtractor', () => {
  describe('extractImages', () => {
    it('should extract single image from SVG', () => {
      const svg = `
        <svg>
          <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
        </svg>
      `;
      const images = extractImages(svg);

      expect(images).toHaveLength(1);
      expect(images[0].format).toBe('image/png');
      expect(images[0].dataUrl).toContain('data:image/png');
      expect(images[0].index).toBe(0);
      expect(images[0].size).toBeGreaterThan(0);
      expect(images[0].id).toBeTruthy();
    });

    it('should extract multiple images from SVG', () => {
      const svg = `
        <svg>
          <image href="data:image/png;base64,ABC123" />
          <image href="data:image/jpeg;base64,XYZ789" />
          <image href="data:image/gif;base64,GIF000" />
        </svg>
      `;
      const images = extractImages(svg);

      expect(images).toHaveLength(3);
      expect(images[0].format).toBe('image/png');
      expect(images[1].format).toBe('image/jpeg');
      expect(images[2].format).toBe('image/gif');
    });

    it('should support xlink:href attribute', () => {
      const svg = `
        <svg xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="data:image/png;base64,ABC123" />
        </svg>
      `;
      const images = extractImages(svg);

      expect(images).toHaveLength(1);
      expect(images[0].format).toBe('image/png');
    });

    it('should ignore external image references', () => {
      const svg = `
        <svg>
          <image href="https://example.com/image.png" />
          <image href="data:image/png;base64,ABC123" />
        </svg>
      `;
      const images = extractImages(svg);

      // Only data URL should be extracted
      expect(images).toHaveLength(1);
      expect(images[0].dataUrl).toContain('data:image/png');
    });

    it('should return empty array for SVG without images', () => {
      const svg = '<svg><circle cx="50" cy="50" r="40" /></svg>';
      const images = extractImages(svg);

      expect(images).toHaveLength(0);
    });

    it('should throw error for empty SVG content', () => {
      expect(() => extractImages('')).toThrow('SVG content is empty');
    });

    it('should throw error for non-SVG content', () => {
      expect(() => extractImages('<div>Not SVG</div>')).toThrow('Content does not appear to be valid SVG');
    });

    it('should throw ParseError for malformed SVG', () => {
      const malformedSvg = '<svg><image href="data:image/png;base64,ABC"></svg'; // Missing closing tag
      expect(() => extractImages(malformedSvg)).toThrow();
    });

    it('should handle different image formats', () => {
      const formats = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
      const svg = `
        <svg>
          ${formats.map(fmt => `<image href="data:image/${fmt};base64,DATA" />`).join('\n')}
        </svg>
      `;
      const images = extractImages(svg);

      expect(images).toHaveLength(formats.length);
      formats.forEach((fmt, i) => {
        expect(images[i].format).toBe(`image/${fmt}`);
      });
    });

    it('should assign unique IDs to images', () => {
      const svg = `
        <svg>
          <image href="data:image/png;base64,ABC" />
          <image href="data:image/png;base64,XYZ" />
        </svg>
      `;
      const images = extractImages(svg);

      expect(images[0].id).not.toBe(images[1].id);
      expect(images[0].id).toMatch(/^img-\d+-0$/);
      expect(images[1].id).toMatch(/^img-\d+-1$/);
    });

    it('should estimate image size correctly', () => {
      // Base64 encoded 1x1 red pixel PNG (68 bytes decoded)
      const svg = `
        <svg>
          <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==" />
        </svg>
      `;
      const images = extractImages(svg);

      expect(images[0].size).toBeGreaterThan(0);
      expect(images[0].size).toBeLessThan(200); // Should be around 68 bytes
    });
  });

  describe('countImages', () => {
    it('should count images in SVG', () => {
      const svg = `
        <svg>
          <image href="data:image/png;base64,ABC" />
          <image href="data:image/png;base64,XYZ" />
        </svg>
      `;
      expect(countImages(svg)).toBe(2);
    });

    it('should return 0 for SVG without images', () => {
      const svg = '<svg><circle /></svg>';
      expect(countImages(svg)).toBe(0);
    });

    it('should return 0 for invalid SVG', () => {
      expect(countImages('not svg')).toBe(0);
      expect(countImages('')).toBe(0);
    });
  });
});
