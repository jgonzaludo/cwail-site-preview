import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage for tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

// Define localStorage for both browser and Node.js environments
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

// Also define it globally for Node.js environment
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});