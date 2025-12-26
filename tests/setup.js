import { afterEach, beforeAll, vi } from 'vitest';

// Mock browser APIs
beforeAll(() => {
  // Mock URL.createObjectURL and revokeObjectURL
  global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
  global.URL.revokeObjectURL = vi.fn();

  // Mock DOMParser if not available
  if (typeof global.DOMParser === 'undefined') {
    global.DOMParser = window.DOMParser;
  }
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
