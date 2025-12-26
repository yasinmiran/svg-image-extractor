/**
 * @fileoverview Image download utilities
 * @module lib/imageDownloader
 */

/**
 * Downloads a single image
 *
 * Creates a temporary download link and triggers browser download.
 * Automatically determines filename from image format if not provided.
 *
 * @param {Object} image - Extracted image object
 * @param {string} image.dataUrl - Data URL of the image
 * @param {string} image.format - Image MIME type
 * @param {number} image.index - Image index
 * @param {string} [customFilename] - Optional custom filename
 *
 * @example
 * downloadSingleImage(extractedImage);
 * downloadSingleImage(extractedImage, 'my-custom-name.png');
 */
export function downloadSingleImage(image, customFilename = null) {
  // Determine filename
  let filename;
  if (customFilename) {
    filename = customFilename;
  } else {
    // Extract extension from format (e.g., 'image/png' -> 'png')
    const ext = image.format.split('/')[1] || 'png';
    filename = `image-${image.index + 1}.${ext}`;
  }

  // Create download link
  const link = document.createElement('a');
  link.href = image.dataUrl;
  link.download = filename;

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
}

/**
 * Downloads a blob as a file
 *
 * Generic blob download utility used for ZIP files.
 *
 * @param {Blob} blob - Blob to download
 * @param {string} filename - Filename for download
 *
 * @example
 * downloadBlob(zipBlob, 'images.zip');
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
