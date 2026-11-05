import '@testing-library/jest-dom/vitest'; // adds matchers like toBeInTheDocument()
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Remove rendered components after each test so tests don't affect each other
afterEach(() => {
  cleanup();
});